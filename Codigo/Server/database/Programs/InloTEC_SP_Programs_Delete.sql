-- Autor:       Luis Molina
-- Fecha:       2024-10-14
-- Descripci�n: Procedure to delete a program. It deletes all courses related to it
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Programs_Delete]
	-- Parameters
	@IN_IdPrograms BIGINT

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';

	BEGIN TRY
        -- VALIDATIONS

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_IdPrograms)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;
	
		-- Check if the program is already registered and active
    	IF NOT EXISTS (SELECT 1
			   FROM [dbo].[Programs] P
			   WHERE P.[Id] = @IN_IdPrograms
			   AND Deleted = 0 )
        BEGIN
		RAISERROR('El tecnico indicado no fue encontrado. Por favor, utilice otro identificador.', 16, 1);
	END;

	-- Check if programs is associated
    IF EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   INNER JOIN Programs P ON P.Id = CD.IdPrograms
					   WHERE P.Id = @IN_IdPrograms
					   AND CD.Deleted = 0)
    	BEGIN
		RAISERROR('El tecnico esta asociado a un curso y no se puede borrar.', 16, 1);
	END;

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- DELETE Courses_Programs
		UPDATE Courses_Programs
		SET Deleted = 1
		WHERE IdPrograms = @IN_IdPrograms 


		--DELETE Courses that have no Courses_Programs asociations

		--delete all courses
		UPDATE Courses
		SET Deleted = 1

		--reactivate all courses with an active Courses_Programs asociations
		UPDATE C
		SET C.Deleted = 0
		FROM Courses C
		INNER JOIN Courses_Programs CP ON CP.IdCourses = C.Id
		WHERE CP.Deleted = 0


		-- DELETE the Programs
		UPDATE Programs
		SET Deleted = 1
		WHERE Id = @IN_IdPrograms

        
        -- COMMIT TRANSACTION
        IF @transactionBegun = 1
        BEGIN
		COMMIT TRANSACTION;
	END;

		--RESPONSE
		--
		SELECT 1

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
