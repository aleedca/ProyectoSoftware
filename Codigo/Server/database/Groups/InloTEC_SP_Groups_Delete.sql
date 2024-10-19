-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to delete a group
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Groups_Delete]
	-- Parameters
	@IN_name NVARCHAR(64)

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @IdGroups BIGINT = 0

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

    	-- Check if the group is already registered and active
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Groups]
					   WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_name)))
					   AND Deleted = 0 )
    	BEGIN
		RAISERROR('El grupo a borrar no se encontró. Por favor, utilice otro .', 16, 1);
		END;

		-- Check if group is associated
        IF EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details_Groups] CDG
					   INNER JOIN Groups G ON G.Id = CDG.IdGroups
					   WHERE G.[Name] = LTRIM(RTRIM(@IN_name))
					   AND CDG.Deleted = 0)
    	BEGIN
		RAISERROR('El grupo esta asociado a un curso y no se puede borrar.', 16, 1);
	    END;


		--validation of user rol



		--getting the id value of the group
		SELECT @IdGroups = G.Id
		FROM [dbo].[Groups] G
		WHERE LOWER(G.[Name]) = LOWER(LTRIM(RTRIM(@IN_name)))
		AND Deleted = 0

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		--deleting the associations with Course_Details
		UPDATE Courses_Details_Groups
		SET Deleted = 1
		WHERE IdGroups = @IdGroups

		--deleting the group
		UPDATE [dbo].[Groups]
		SET  
		    Deleted = 1
		WHERE Id = @IdGroups

        
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
