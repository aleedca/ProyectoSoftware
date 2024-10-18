-- Autor:       Luis Molina
-- Fecha:       2024-09-25
-- Descripci�n: Procedure to get a holiday
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Holidays_Get]
    -- Parameters
    @IN_IdHolidays BIGINT
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
					   FROM [dbo].[Holidays] H
					   WHERE H.Id = @IN_IdHolidays
					   AND H.Deleted = 0)
    	BEGIN
		RAISERROR('El feriado indicado no existe. Por favor, utilice otro identificador.', 16, 1);
		END;

		SELECT H.Id, H.Name, H.StartDatetime, H.EndDatetime
        FROM Holidays H
        WHERE H.Deleted = 0
        AND H.Id = @IN_IdHolidays
		

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
