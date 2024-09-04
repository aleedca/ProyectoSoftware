-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add an Hours entry. return the id value
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Schedule_Days_Add]
	-- Parameters
	@IN_IdHours BIGINT, 
	@IN_IdDays NVARCHAR(128)


AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @TableDays TABLE (
		Id INT UNIQUE NOT NULL);
	DECLARE @TableId TABLE (
		Id INT UNIQUE NOT NULL);

	BEGIN TRY
        -- VALIDATIONS
    	

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_IdHours)) = '' OR
		   LTRIM(RTRIM(@IN_IdDays)) = ''
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
		RAISERROR('Se repite alguna instancia de dias.', 16, 1);
	END CATCH

	--get the IdDays that must be added
	INSERT INTO @TableId
	SELECT TD.Id
	FROM Schedule_Days SD
	INNER JOIN [Days] D ON D.Id = SD.IdDays
	INNER JOIN [Hours] H ON H.Id = SD.IdHours
	RIGHT JOIN @TableDays TD ON TD.Id = SD.IdDays
	WHERE SD.IdHours = @IN_IdHours
	AND H.Deleted = 0
	AND SD.Deleted = 0
	AND D.Deleted = 0
	AND SD.Id IS NULL

	--validation of user rol






        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		IF EXISTS (SELECT 1 FROM @TableId)
		BEGIN
			--Some data needs to be inserted
			INSERT INTO [dbo].[Schedule_Days]
				([IdDays], [IdHours], [Deleted])
				SELECT T.Id, @IN_IdHours, 0
				FROM @TableId T
		END
        
        -- COMMIT TRANSACTION
        IF @transactionBegun = 1
        BEGIN
		COMMIT TRANSACTION;
	END;

		--RESPONSE
		--
		SELECT SD.Id
		FROM Schedule_Days SD
		INNER JOIN [Days] D ON D.Id = SD.IdDays
		INNER JOIN [Hours] H ON H.Id = SD.IdHours
		INNER JOIN @TableDays TD ON TD.Id = SD.IdDays
		WHERE SD.IdHours = @IN_IdHours
		AND H.Deleted = 0
		AND SD.Deleted = 0
		AND D.Deleted = 0

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
