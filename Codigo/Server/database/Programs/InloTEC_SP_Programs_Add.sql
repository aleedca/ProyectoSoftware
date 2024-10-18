-- Autor:       Luis Molina
-- Fecha:       2024-10-14
-- Descripci�n: Procedure to add a program
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Programs_Add]
	-- Parameters
	@IN_name NVARCHAR(256)

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

		-- check for wrong input data type
        IF ISNUMERIC(@IN_name) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_name)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
	END;

        -- Check if the name is already registered and active
        IF EXISTS (SELECT 1
		FROM [dbo].[Programs]
		WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_name)))
		AND Deleted = 0 )
        BEGIN
		RAISERROR('El nombre del tecnico ya está registrado. Por favor, utilice otro.', 16, 1);
	END;

	

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- INSERT Programs
		INSERT INTO [dbo].[Programs]
			([Name], [Deleted])
		VALUES(
				LTRIM(RTRIM(@IN_name)),
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
