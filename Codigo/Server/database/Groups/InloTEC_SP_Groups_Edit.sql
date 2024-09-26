-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to edit a group name
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Groups_Edit]
	-- Parameters
	@IN_oldName NVARCHAR(64),
	@IN_newName NVARCHAR(64)

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
        IF ISNUMERIC(@IN_oldName) = 1 OR
		   ISNUMERIC(@IN_newName) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
		END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_oldName)) = '' OR
		   LTRIM(RTRIM(@IN_newName)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
		END;

    	-- Check if the old name is already registered and active
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Groups]
					   WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_oldName)))
					   AND Deleted = 0 )
    	BEGIN
		RAISERROR('El grupo a editar no fue encontrado.', 16, 1);
		END;

		-- Check if the new name is already registered and active
    	IF EXISTS (SELECT 1
					   FROM [dbo].[Groups]
					   WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_newName)))
					   AND Deleted = 0 )
    	BEGIN
		RAISERROR('El nombre ya está registrado. Por favor, utilice otro.', 16, 1);
		END;


		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		--the group is edited
		UPDATE [dbo].[Groups]
		SET  
		    [Name] = LTRIM(RTRIM(@IN_newName))
		WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_oldName)))

        
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
