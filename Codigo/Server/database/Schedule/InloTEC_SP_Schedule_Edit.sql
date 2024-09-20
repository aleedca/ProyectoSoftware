-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to edit a Schedule
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Schedule_Edit]
	-- Parameters
	@IN_IdSchedule BIGINT,
	@IN_newName NVARCHAR(128) = NULL,
	@IN_newIdDays NVARCHAR(128) = NULL, -- 1,2,3,4,5,6
	@IN_newStartTime TIME = NULL,
	@IN_newEndTime TIME = NULL


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
	DECLARE @TableDays TABLE (
		Id INT UNIQUE NOT NULL);
	DECLARE @TableSchedule_Days TABLE (
		Id INT UNIQUE NOT NULL);

	BEGIN TRY
        -- VALIDATIONS

		-- Check if the Schedule is already registered and active
		IF NOT EXISTS (SELECT 1 
					   FROM [dbo].[Schedule]
					   WHERE Id = @IN_IdSchedule
    	               AND Deleted = 0)
    	    BEGIN
    	        RAISERROR('El horario indicado para modificación no fue encontrado.', 16, 1);
    	    END;

		-- getting the old values of Schedules  if necessary
		SELECT @IN_newName = CASE WHEN @IN_newName IS NULL 
								  THEN S.Name 
								  ELSE @IN_newName END, 
			   @IN_newIdDays = CASE WHEN @IN_newIdDays IS NULL 
								    THEN A.Days 
								    ELSE @IN_newIdDays END,
			   @IN_newStartTime = CASE WHEN @IN_newStartTime IS NULL 
								       THEN CAST(A.StartTime AS TIME(0)) 
								       ELSE CAST(DATEADD(HOUR, -6, CAST(@IN_newStartTime AS DATETIME)) AS TIME) END , 
			   @IN_newEndTime = CASE WHEN @IN_newEndTime IS NULL 
								     THEN CAST(A.EndTime AS TIME(0)) 
								     ELSE CAST(DATEADD(HOUR, -6, CAST(@IN_newEndTime AS DATETIME)) AS TIME) END 
		FROM Schedule S
		INNER JOIN (SELECT SDS.IdSchedule AS 'IdSchedule', 
						   STRING_AGG(D.Id,',') AS 'Days', 
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
		WHERE S.Id = @IN_IdSchedule
    	
		-- check for wrong input data type
        IF ISNUMERIC(@IN_newName) = 1
        BEGIN
		RAISERROR('El nombre debe ser texto. Por favor, complete cambie la informaci�n.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_newName)) = '' OR
		   LTRIM(RTRIM(@IN_newIdDays)) = '' OR
		   LTRIM(RTRIM(@IN_newStartTime)) = '' OR
		   LTRIM(RTRIM(@IN_newEndTime)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;

		IF EXISTS (SELECT 1
					   WHERE @IN_newStartTime > @IN_newEndTime)
    	BEGIN
		RAISERROR('La hora final esta antes que la hora inicial.', 16, 1);
	END;

	BEGIN TRY
		-- Parse of @IN_IdDays to check for repited days
		INSERT INTO @TableDays (Id)
		SELECT CAST(A.Idstr AS INT) 
		FROM (SELECT TRIM(VALUE) AS 'Idstr' 
			  FROM STRING_SPLIT(@IN_newIdDays, ',')) AS A
	END TRY
	BEGIN CATCH
		RAISERROR('Se repite alguna instancia de dias', 16, 1);
	END CATCH
	
	-- Check if the schedule name is already registered and active
    IF NOT EXISTS (SELECT 1
			   FROM [dbo].[Schedule] S
			   WHERE S.[Name] = LTRIM(RTRIM(@IN_newName))
			   AND S.id <> @IN_IdSchedule
			   AND Deleted = 0 )
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

		--DELETE previos schedules
		-- this is done this way because of the complexity
		-- of knowing when to do nothing, add or remove.

		UPDATE ScheduleDays_Schedule
		SET Deleted = 1
		WHERE IdSchedule = @IN_IdSchedule


		-- INSERT Schedule

		--register the hours to the database and get hours id
		EXEC [dbo].[InloTEC_SP_Hours_Add] @IN_newStartTime, @IN_newEndTime, @IdHours OUTPUT

		--register and extracting of the id(s) of the Schedule_Days
		INSERT INTO @TableSchedule_Days (Id)
		EXEC [dbo].[InloTEC_SP_Schedule_Days_Add] @IdHours, @IN_newIdDays;

		UPDATE [Schedule]
		SET [Name] = @IN_newName

		INSERT INTO [dbo].[ScheduleDays_Schedule] ([IdSchedule_Days], [IdSchedule], [Deleted])
		SELECT TSD.Id ,A.Id, 0
		FROM @TableSchedule_Days TSD
		JOIN (SELECT S.Id AS 'Id'
		FROM Schedule S
		WHERE S.Id = @IN_IdSchedule) AS A ON 1 = 1

        
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
