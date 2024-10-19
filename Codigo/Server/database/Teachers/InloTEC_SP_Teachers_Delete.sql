-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to delete a teacher
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Teachers_Delete]
	-- Parameters
	@IN_email NVARCHAR(128)

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @TeacherId INT = NULL;

	BEGIN TRY
        -- VALIDATIONS

		-- check for wrong input data type
        IF ISNUMERIC(@IN_email) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
		END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_email)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
		END;

    	-- Check if the email is already registered and active
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Teachers]
					   WHERE Email = LTRIM(RTRIM(@IN_email))
					   AND Deleted = 0 )
    	BEGIN
		RAISERROR('El correo electrónico no está registrado. Por favor, utilice otro correo.', 16, 1);
		END;

		-- Check if teacher is associated
    	IF EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   INNER JOIN Teachers T ON T.Id = CD.IdTeachers
					   WHERE T.Email = LTRIM(RTRIM(@IN_email))
					   AND CD.Deleted = 0)
    	BEGIN
		RAISERROR('El profesor esta asociado a un curso y no se puede borrar.', 16, 1);
		END;


		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		--the teacher is deleted
		UPDATE [dbo].[Teachers]
		SET  
		    Deleted = 1
		WHERE Email = LTRIM(RTRIM(@IN_email))

        
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
