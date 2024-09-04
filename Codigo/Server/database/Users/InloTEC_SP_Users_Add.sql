-- Autor:       Luis Molina
-- Fecha:       2024-08-17
-- Descripci�n: Procedure to add a user with duplicated email validation.
--				It assign the basic rol as a default
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Users_Add]
	-- Parameters
	@IN_name NVARCHAR(32),
	@IN_lastName1 NVARCHAR(32),
	@IN_lastName2 NVARCHAR(32),
	@IN_passwordhash NVARCHAR(32),
	@IN_email NVARCHAR(128)

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @CreatedId INT = NULL;
	DECLARE @BasicRolId INT = NULL;
	DECLARE @UserId INT = NULL;
	DECLARE @Rolname NVARCHAR(64) = 'Normal_User';

	BEGIN TRY
        -- VALIDATIONS

		-- check for wrong input data type
        IF ISNUMERIC(@IN_name) = 1 OR
		ISNUMERIC(@IN_lastName1) = 1 OR
		ISNUMERIC(@IN_lastName2) = 1 OR
		ISNUMERIC(@IN_passwordhash) = 1 OR
		ISNUMERIC(@IN_email) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la informaci�n.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_name)) = '' OR
		LTRIM(RTRIM(@IN_lastName1)) = '' OR
		LTRIM(RTRIM(@IN_lastName2)) = '' OR
		LTRIM(RTRIM(@IN_passwordhash)) = '' OR
		LTRIM(RTRIM(@IN_email)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;

        -- Check if the email is already registered and active
        IF EXISTS (SELECT 1
	FROM [dbo].[Users]
	WHERE email = LTRIM(RTRIM(@IN_email))
		AND Deleted = 0 )
        BEGIN
		RAISERROR('El correo electr�nico ya est� registrado. Por favor, utilice otro correo.', 16, 1);
	END;


		--get the role Id
		SELECT @BasicRolId = Id
		FROM Roles
		WHERE Name = @Rolname

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- INSERT USER
		INSERT INTO [dbo].[Users]
			([Name], [LastName1], [LastName2], [Passwordhash], [Email], [Deleted])
		VALUES
			(
				LTRIM(RTRIM(@IN_name)),
				LTRIM(RTRIM(@IN_lastName1)),
				LTRIM(RTRIM(@IN_lastName2)),
				LTRIM(RTRIM(@IN_passwordhash)),
				LTRIM(RTRIM(@IN_email)),
				0
				);

		SET @CreatedId = SCOPE_IDENTITY();

		-- Assigne default rol to user
		INSERT INTO [dbo].[Users_Roles]
			([IdUsers], [IdRoles], [Deleted])
		VALUES(
				@CreatedId,
				@BasicRolId,
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
