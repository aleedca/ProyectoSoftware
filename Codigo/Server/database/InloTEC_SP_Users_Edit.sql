-- Autor:       Luis Molina
-- Fecha:       2024-08-17
-- Descripci�n: Procedure to edit a user information.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Users_Edit]
    -- Parameters
    @IN_oldUsername NVARCHAR(32),
    @IN_oldPasswordhash NVARCHAR(32),
    @IN_oldEmail NVARCHAR(128),
	@IN_newUsername NVARCHAR(32) = NULL,
    @IN_newPasswordhash NVARCHAR(32) = NULL,
    @IN_newEmail NVARCHAR(128) = NULL
    

AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
	DECLARE @UserId INT = NULL;
	DECLARE @previosEmaiId INT = NULL;
	DECLARE @newUsername NVARCHAR(32) = NULL;
    DECLARE @newPasswordhash NVARCHAR(32) = NULL;
    DECLARE @newEmail NVARCHAR(128) = NULL;

    BEGIN TRY
        -- VALIDATIONS
		
		-- check for wrong input data type
        IF ISNUMERIC(@IN_oldUsername) = 1 OR
           ISNUMERIC(@IN_oldPasswordhash) = 1 OR
           ISNUMERIC(@IN_oldEmail) = 1
        BEGIN
            RAISERROR('Todos los campos deben ser texto. Por favor, cambie la informaci�n.', 16, 1);
        END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_oldUsername)) = '' OR
           LTRIM(RTRIM(@IN_oldPasswordhash)) = '' OR
           LTRIM(RTRIM(@IN_oldEmail)) = ''
        BEGIN
            RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
        END;

        -- Check if the user is already registered and active
        IF NOT EXISTS (SELECT 1 
				   FROM [dbo].[Users] 
				   WHERE email = LTRIM(RTRIM(@IN_oldEmail))
				   AND LTRIM(RTRIM(@IN_oldPasswordhash)) = Passwordhash
				   AND LTRIM(RTRIM(@IN_oldUsername)) = Username
				   AND Deleted = 0 )
        BEGIN
            RAISERROR('El usuario a editar no fue encontrado.', 16, 1);
        END;

		--assign the new value if it exists
		IF @IN_newUsername IS NOT NULL
			BEGIN
				SELECT @newUsername = @IN_newUsername
			END
		ELSE
			BEGIN
				SELECT @newUsername = @IN_oldUsername
			END

		IF @IN_newPasswordhash IS NOT NULL
			BEGIN
				SELECT @newPasswordhash = @IN_newPasswordhash
			END
		ELSE
			BEGIN
				SELECT @newPasswordhash = @IN_oldPasswordhash
			END

		IF @IN_newEmail IS NOT NULL
			BEGIN
				SELECT @newEmail = @IN_newEmail
			END
		ELSE
			BEGIN
				SELECT @newEmail = @IN_oldEmail
			END

		-- check for wrong input data type
        IF ISNUMERIC(@newUsername) = 1 OR
           ISNUMERIC(@newPasswordhash) = 1 OR
           ISNUMERIC(@newEmail) = 1
        BEGIN
            RAISERROR('Todos los campos deben ser texto. Por favor, cambie la informaci�n.', 16, 1);
        END;

		-- check for empty input data
        IF LTRIM(RTRIM(@newUsername)) = '' OR
           LTRIM(RTRIM(@newPasswordhash)) = '' OR
           LTRIM(RTRIM(@newEmail)) = ''
        BEGIN
            RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
        END;

        -- Check if the email is already registered and active
        IF EXISTS (SELECT 1 
				   FROM [dbo].[Users] 
				   WHERE email = LTRIM(RTRIM(@IN_newEmail))
				   AND Deleted = 0 )
        BEGIN
            RAISERROR('El nuevo correo electr�nico ya est� registrado. Por favor, utilice otro correo.', 16, 1);
        END;

		SELECT @previosEmaiId = Id 
		FROM [dbo].[Users] 
				   WHERE email = LTRIM(RTRIM(@IN_newEmail))
				   AND Deleted = 1

		--get the user id of the email
		SELECT @UserId = U.id
		FROM [dbo].[Users] U
		WHERE email = LTRIM(RTRIM(@IN_oldEmail))
		AND LTRIM(RTRIM(@IN_oldPasswordhash)) = U.Passwordhash 
		AND Deleted = 0

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
            SET @transactionBegun = 1;
            BEGIN TRANSACTION;
        END;
		-- the user gets edited
		UPDATE [dbo].[Users]
		SET 
			[Username] = LTRIM(RTRIM(@newUsername)),
			[Passwordhash] = LTRIM(RTRIM(@newPasswordhash)), 
			[Email] = LTRIM(RTRIM(@newEmail))
		WHERE Id = @UserId;

		--switch the email value of the discarted email
		--happens if a previosly deleted user email
		--becomes the email of a new entry.
		UPDATE [dbo].[Users]
		SET 
			[Email] = LTRIM(RTRIM(@IN_oldEmail))
		WHERE Id = @previosEmaiId;

        
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
