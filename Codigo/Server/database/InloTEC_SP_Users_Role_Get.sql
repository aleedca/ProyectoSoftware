-- Autor:       Luis Molina
-- Fecha:       2024-08-17
-- Descripci�n: Procedure to get the user rol information.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Users_Role_Get]
    -- Parameters
    @IN_Username NVARCHAR(32),
    @IN_Passwordhash NVARCHAR(32),
    @IN_Email NVARCHAR(128)
    

AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION
	DECLARE @UserId INT = NULL;

    BEGIN TRY
        -- VALIDATIONS
		
		-- check for wrong input data type
        IF ISNUMERIC(@IN_Username) = 1 OR
           ISNUMERIC(@IN_Passwordhash) = 1 OR
           ISNUMERIC(@IN_Email) = 1
        BEGIN
            RAISERROR('Todos los campos deben ser texto. Por favor, cambie la informaci�n.', 16, 1);
        END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_Username)) = '' OR
           LTRIM(RTRIM(@IN_Passwordhash)) = '' OR
           LTRIM(RTRIM(@IN_Email)) = ''
        BEGIN
            RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
        END;

        -- Check if the user is already registered and active
        IF NOT EXISTS (SELECT 1 
				   FROM [dbo].[Users] 
				   WHERE email = LTRIM(RTRIM(@IN_Email))
				   AND LTRIM(RTRIM(@IN_Passwordhash)) = Passwordhash
				   AND LTRIM(RTRIM(@IN_Username)) = Username
				   AND Deleted = 0)
        BEGIN
            RAISERROR('El usuario no fue encontrado.', 16, 1);
        END;

		--get the user id
		SELECT @UserId = U.id
		FROM [dbo].[Users] U
		WHERE email = LTRIM(RTRIM(@IN_Email))
		AND LTRIM(RTRIM(@IN_Passwordhash)) = Passwordhash
		AND LTRIM(RTRIM(@IN_Username)) = Username
		AND Deleted = 0

		SELECT R.Name AS 'Rol'
		FROM [dbo].[Roles] R
		INNER JOIN [dbo].[Users_Roles] UR ON UR.IdRoles = R.Id
		INNER JOIN [dbo].[Users] U ON U.Id = UR.IdUsers
		WHERE U.Id = @UserId
		AND UR.Deleted = 0
        

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
