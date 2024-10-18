-- Autor:       Luis Molina
-- Fecha:       2024-10-14
-- Descripci�n: Procedure to get a program details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Programs_Get]
    -- Parameters
    @IN_IdPrograms BIGINT
AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION

    BEGIN TRY
        -- VALIDATIONS
		
        -- Check if the id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Programs] P
					   WHERE P.Id = @IN_IdPrograms
					   AND P.Deleted = 0)
    	BEGIN
		RAISERROR('El tecnico indicado no existe. Por favor, utilice otro identificador.', 16, 1);
		END;

		SELECT P.Id, P.Name, A.Courses
        FROM Programs P
        INNER JOIN (SELECT CP.IdPrograms AS 'IdPrograms', STRING_AGG(C.Name, ',') AS 'Courses'
		    FROM Courses_Programs CP
		    INNER JOIN Courses C ON C.Id = CP.IdCourses
		    WHERE CP.Id = @IN_IdPrograms
		    AND CP.Deleted = 0
		    AND C.Deleted = 0
		    GROUP BY CP.IdPrograms) A ON A.IdPrograms = P.Id
        WHERE P.Deleted = 0
		

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
            VALUES (
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
