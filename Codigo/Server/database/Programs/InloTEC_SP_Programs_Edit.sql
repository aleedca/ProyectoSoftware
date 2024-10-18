-- Autor:       Luis Molina
-- Fecha:       2024-10-14
-- Descripci�n: Procedure to edit a program
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Programs_Edit]
	-- Parameters
	@IN_IdPrograms BIGINT,
	@IN_newName NVARCHAR(256) = NULL

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

		-- Check if the Program is already registered and active
		IF NOT EXISTS (SELECT 1 
					   FROM [dbo].[Programs]
					   WHERE Id = @IN_IdPrograms
    	               AND Deleted = 0)
    	    BEGIN
    	        RAISERROR('El tecnico indicado para modificación no fue encontrado.', 16, 1);
    	    END;

		SELECT @IN_newName = CASE WHEN @IN_newName IS NULL 
								    THEN P.Name 
								    ELSE @IN_newName END
		FROM Programs P
		WHERE P.Id = @IN_IdPrograms
    	AND P.Deleted = 0


		-- check for wrong input data type
        IF ISNUMERIC(@IN_newName) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_newName)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
	END;


        -- Check if the program name is already registered and active
    	IF EXISTS (SELECT 1
			   FROM [dbo].[Programs] P
			   WHERE LOWER(P.[Name]) = LOWER(LTRIM(RTRIM(@IN_newName)))
			   AND P.Id <> @IN_IdPrograms
			   AND P.Deleted = 0 )
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

		
		UPDATE Programs
		SET
			[Name] = LTRIM(RTRIM(@IN_newName))
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
