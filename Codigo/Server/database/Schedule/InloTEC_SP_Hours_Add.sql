-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add an Hours entry. return the id value
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Hours_Add]
	-- Parameters
	@IN_startTime TIME,
	@IN_endTime TIME,
	@IN_IdHours BIGINT OUTPUT


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
    	

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_startTime)) = '' OR
		   LTRIM(RTRIM(@IN_endTime)) = '' OR 
		   LTRIM(RTRIM(@IN_IdHours)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la informaci�n.', 16, 1);
	END;

	SELECT @IN_startTime = CAST(DATEADD(HOUR, -6, CAST(@IN_startTime AS DATETIME)) AS TIME)
	SELECT @IN_endTime = CAST(DATEADD(HOUR, -6, CAST(@IN_endTime AS DATETIME)) AS TIME)

		IF NOT EXISTS (SELECT 1
					   WHERE @IN_startTime < @IN_endTime)
    	BEGIN
		RAISERROR('La hora final esta antes que la hora inicial.', 16, 1);
	END;

	--
    SELECT @IN_IdHours = H.Id
	FROM [dbo].[Hours] H
	WHERE StartTime = @IN_startTime
	AND EndTime = @IN_endTime
	AND Deleted = 0

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- INSERT Course_Details
		IF @IN_IdHours IS NULL
		BEGIN
			--the entry needs to be added
			INSERT INTO [dbo].[Hours]
				([StartTime], [EndTime], [Deleted])
				VALUES(
				LTRIM(RTRIM(@IN_startTime)),
				LTRIM(RTRIM(@IN_endTime)),
				0
				);

		SET @IN_IdHours = SCOPE_IDENTITY();
	END;

        
        -- COMMIT TRANSACTION
        IF @transactionBegun = 1
        BEGIN
		COMMIT TRANSACTION;
	END;

		--RESPONSE
		--
		SELECT @IN_IdHours

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
