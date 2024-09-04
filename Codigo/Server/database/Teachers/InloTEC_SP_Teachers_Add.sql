-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add a teacher with duplicated email validation.

--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Teachers_Add]
	-- Parameters
	@IN_name NVARCHAR(128),
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
        IF ISNUMERIC(@IN_name) = 1 OR
		ISNUMERIC(@IN_email) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
		END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_name)) = '' OR
		LTRIM(RTRIM(@IN_email)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
		END;

        -- Check if the email is already registered and active
        IF EXISTS (SELECT 1
				   FROM [dbo].[Teachers]
				   WHERE Email = LTRIM(RTRIM(@IN_email))
				   AND Deleted = 0 )
        BEGIN
		RAISERROR('El correo electrónico ya está registrado. Por favor, utilice otro correo.', 16, 1);
		END;

		--validation of user rol


        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- INSERT teacher
		INSERT INTO [dbo].[Teachers]
			([Name], [Email], [Deleted])
		VALUES
			(
				LTRIM(RTRIM(@IN_name)),
				LTRIM(RTRIM(@IN_email)),
				0
				);

        
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
