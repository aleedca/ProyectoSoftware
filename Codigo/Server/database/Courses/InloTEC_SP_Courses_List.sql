-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to list all the courses
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_List]
	-- Parameters
	

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION

	BEGIN TRY
        -- VALIDATIONS

		--Response
		SELECT C.Id, C.Name, A.Programs AS 'Programs'
		FROM [dbo].[Courses] C
		INNER JOIN Courses_Programs CP ON CP.IdCourses = C.Id
		INNER JOIN (SELECT CP.IdPrograms AS 'IdPrograms', STRING_AGG(P.Name, ',') AS 'Programs'
					FROM Programs P
					INNER JOIN Courses_Programs CP ON CP.IdPrograms = P.Id
					WHERE P.Deleted = 0
					AND CP.Deleted = 0
					GROUP BY CP.IdPrograms ) AS A ON A.IdPrograms = CP.IdPrograms
		WHERE CP.Deleted = 0
		AND C.Deleted = 0
		


    END TRY
    BEGIN CATCH
        SET @ErrorNumber = ERROR_NUMBER();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        SET @Message = ERROR_MESSAGE();

        IF @transactionBegun = 1
        BEGIN
		ROLLBACK;
	END;

        IF @ErrorNumber != 50000
        BEGIN
		-- Non-custom errors are logged in the Errors table
		INSERT INTO [dbo].[Errors]
		VALUES
			(
				SUSER_NAME(),
				ERROR_NUMBER(),
				ERROR_STATE(),
				ERROR_SEVERITY(),
				ERROR_LINE(),
				ERROR_PROCEDURE(),
				ERROR_MESSAGE(),
				GETUTCDATE()
            );
	END;

        RAISERROR('%s - Error Number: %i', 
            @ErrorSeverity, @ErrorState, @Message, @ErrorNumber);
    END CATCH;
END;
