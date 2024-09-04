-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to list all Schedule
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Schedule_List]
	-- Parameters


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

		--Response
		SELECT S.Name, A.Days, A.StartTime, A.EndTime
		FROM Schedule S
		INNER JOIN (SELECT SDS.IdSchedule AS 'IdSchedule', 
						   STRING_AGG(D.Name,',') AS 'Days', 
						   H.StartTime AS 'StartTime', 
						   H.EndTime AS 'EndTime'
					FROM ScheduleDays_Schedule SDS
					INNER JOIN Schedule_Days SD ON SD.Id = SDS.IdSchedule_Days
					INNER JOIN [Hours] H ON H.Id = SD.IdHours
					INNER JOIN [Days] D ON D.Id = SD.IdDays
					WHERE H.Deleted = 0
					AND D.Deleted = 0
					AND SD.Deleted = 0
					AND SDS.Deleted = 0
					GROUP BY SDS.IdSchedule, H.StartTime, H.EndTime) AS A ON A.IdSchedule = S.Id

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
