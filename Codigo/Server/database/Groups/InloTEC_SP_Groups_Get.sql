-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to get a groups's name
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Groups_Get]
    -- Parameters
    @IN_IdGroups BIGINT
AS
BEGIN
    SET NOCOUNT ON; -- No metadata returned

    -- ERROR HANDLING
    DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
    DECLARE @transactionBegun BIT = 0;

    -- VARIABLE DECLARATION

    BEGIN TRY
        -- VALIDATIONS
		
        -- Check if the id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Groups] G
					   WHERE G.Id = @IN_IdGroups
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El grupo indicado no existe. Por favor, utilice otro identificador.', 16, 1);
		END;

		SELECT G.id, G.Name
        FROM Groups G
        WHERE G.Deleted = 0
        AND G.Id = @IN_IdGroups
		

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
