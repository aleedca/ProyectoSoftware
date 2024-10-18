-- Autor:       Luis Molina
-- Fecha:       2024-09-25
-- Descripci�n: Procedure to edit a holiday
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Holidays_Edit]
	-- Parameters
	@IN_IdHolidays BIGINT,
	@IN_newName NVARCHAR(256) = NULL,
	@IN_startDatetime DATETIME = NULL,
	@IN_endDatetime DATETIME = NULL

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';

	BEGIN TRY
        -- VALIDATIONS

		-- Check if the Schedule is already registered and active
		IF NOT EXISTS (SELECT 1 
					   FROM [dbo].[Holidays]
					   WHERE Id = @IN_IdHolidays
    	               AND Deleted = 0)
    	    BEGIN
    	        RAISERROR('El feriado indicado para modificación no fue encontrado.', 16, 1);
    	    END;

		SELECT @IN_newName = CASE WHEN @IN_newName IS NULL 
								    THEN H.Name 
								    ELSE @IN_newName END,
			   @IN_startDatetime = CASE WHEN @IN_startDatetime IS NULL 
								       THEN H.StartDatetime
								       ELSE DATEADD(HOUR, -6, @IN_startDatetime) END , 
			   @IN_endDatetime = CASE WHEN @IN_endDatetime IS NULL 
								     THEN H.EndDatetime
								     ELSE DATEADD(HOUR, -6, @IN_endDatetime) END
		FROM Holidays H
		WHERE H.Id = @IN_IdHolidays
    	AND Deleted = 0


		-- check for wrong input data type
        IF ISNUMERIC(@IN_newName) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_newName)) = '' OR
		   LTRIM(RTRIM(@IN_startDatetime)) = '' OR
		   LTRIM(RTRIM(@IN_endDatetime)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
	END;

		IF EXISTS (SELECT 1
					   WHERE @IN_startDatetime > @IN_endDatetime)
    	BEGIN
		RAISERROR('El final esta antes que el inicio.', 16, 1);
	END;

        -- Check if the holiday name is already registered and active
    	IF NOT EXISTS (SELECT 1
			   FROM [dbo].[Holidays] H
			   WHERE LOWER(H.[Name]) = LOWER(LTRIM(RTRIM(@IN_newName)))
			   AND H.Id <> @IN_IdHolidays
			   AND H.Deleted = 0 )
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

		-- INSERT Groups
		UPDATE Holidays
		SET
			[Name] = LTRIM(RTRIM(@IN_newName)),
			[StartDatetime] = @IN_startDatetime,
			[EndDatetime] = @IN_endDatetime
		WHERE Id = @IN_IdHolidays


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
