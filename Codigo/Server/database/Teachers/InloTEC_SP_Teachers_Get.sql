-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to get a teachers's information.
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Teachers_Get]
    -- Parameters
    @IN_IdTeachers BIGINT
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
					   FROM [dbo].[Teachers] T
					   WHERE T.Id = @IN_IdTeachers
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El curso indicado no existe. Por favor, utilice otro identificador.', 16, 1);
		END;

		SELECT T.id, T.Name, T.email
        FROM Teachers T
        WHERE T.Deleted = 0
        AND T.Id = @IN_IdTeachers
		

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
