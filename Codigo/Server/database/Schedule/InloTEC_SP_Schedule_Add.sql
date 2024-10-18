-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add a Schedule
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Schedule_Add]
	-- Parameters
	@IN_name NVARCHAR(128),
	@IN_IdDays NVARCHAR(128), -- 1,2,3,4,5,6
	@IN_startTime TIME,
	@IN_endTime TIME


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
    	
		-- check for wrong input data type
        IF ISNUMERIC(@IN_name) = 1
        BEGIN
		RAISERROR('El nombre debe ser texto. Por favor, complete cambie la informaci�n.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_name)) = '' OR
		   LTRIM(RTRIM(@IN_IdDays)) = '' OR
		   LTRIM(RTRIM(@IN_startTime)) = '' OR
		   LTRIM(RTRIM(@IN_endTime)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;


	BEGIN TRY

	-- Parse of @IN_IdDays to check for repited days
	INSERT INTO @TableDays (Id)
	SELECT CAST(A.Idstr AS INT) 
	FROM (SELECT TRIM(VALUE) AS 'Idstr' 
		  FROM STRING_SPLIT(@IN_IdDays, ',')) AS A

	END TRY
	BEGIN CATCH
		RAISERROR('Se repite alguna instancia de dias', 16, 1);
	END CATCH
	
	-- Check if the schedule name is already registered and active
    IF EXISTS (SELECT 1
			   FROM [dbo].[Schedule] S
			   WHERE S.[Name] = LTRIM(RTRIM(@IN_name))
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

		-- INSERT Schedule

		--register the hours to the database and get hours id
		EXEC [dbo].[InloTEC_SP_Hours_Add] @IN_startTime, @IN_endTime, @IdHours OUTPUT

		--register and extracting of the id(s) of the Schedule_Days
		INSERT INTO @TableSchedule_Days (Id)
		EXEC [dbo].[InloTEC_SP_Schedule_Days_Add] @IdHours, @IN_IdDays;

		INSERT INTO [dbo].[Schedule]([Name], Deleted)
		VALUES (@IN_name, 0)

		SET @IdSchedule = SCOPE_IDENTITY()


		INSERT INTO [dbo].[ScheduleDays_Schedule] ([IdSchedule_Days], [IdSchedule], [Deleted])
		SELECT TSD.Id ,A.Id, 0
		FROM @TableSchedule_Days TSD
		JOIN (SELECT S.Id AS 'Id'
		FROM Schedule S
		WHERE S.Id = @IdSchedule) AS A ON 1 = 1

        
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
