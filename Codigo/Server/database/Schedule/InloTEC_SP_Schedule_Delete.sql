-- Autor:       Luis Molina
-- Fecha:       2024-09-17
-- Descripci�n: Procedure to delete a Schedule
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Schedule_Delete]
	-- Parameters
	@IN_IdSchedule BIGINT


AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @IdHours INT = NULL;
	DECLARE @IdSchedule_Days INT = NULL;
	DECLARE @IdSchedule INT = NULL;
	DECLARE @TableDays TABLE (
		Id INT UNIQUE NOT NULL);
	DECLARE @TableSchedule_Days TABLE (
		Id INT UNIQUE NOT NULL);

	BEGIN TRY
        -- VALIDATIONS
    	
		-- check for empty input data
        IF LTRIM(RTRIM(@IN_IdSchedule)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;
	
	-- Check if the schedule is already registered and active
    IF NOT EXISTS (SELECT 1
			   FROM [dbo].[Schedule] S
			   WHERE S.[Id] = @IN_IdSchedule
			   AND Deleted = 0 )
        BEGIN
		RAISERROR('El horario indicado no fue encontrado. Por favor, utilice otro identificador.', 16, 1);
	END;

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- DELETE the relation to the catalogs

		UPDATE ScheduleDays_Schedule
		SET Deleted = 1
		WHERE IdSchedule = @IN_IdSchedule

		-- DELETE the Schedule

		UPDATE Schedule
		SET Deleted = 1
		WHERE Id = @IN_IdSchedule

        
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
