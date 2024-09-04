-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add a Course_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Add]
	-- Parameters
	@IN_IdLocation BIGINT,
	@IN_IdTeachers BIGINT,
	@IN_IdCourses BIGINT,
	@IN_IdSchedule BIGINT,
	@IN_IdModality BIGINT,
	@IN_startDate DATE,
	@IN_endDate DATE,
	@IN_notes NVARCHAR(512) = NULL

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @TeacherId INT = NULL;

	BEGIN TRY
        -- VALIDATIONS

		-- Check every id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Teachers] T
					   WHERE T.Id = @IN_IdTeachers
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id de teachers no existe.', 16, 1);
		END;

		IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses] C
					   WHERE C.Id = @IN_IdCourses
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id de courses no existe.', 16, 1);
		END;

		IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Location] L
					   WHERE L.Id = @IN_IdLocation
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id de location no existe.', 16, 1);
		END;

		IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Schedule] S
					   WHERE S.Id = @IN_IdSchedule
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id de Schedule no existe.', 16, 1);
		END;

		IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Modality] M
					   WHERE M.Id = @IN_IdModality
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id de Modality no existe.', 16, 1);
		END;

		IF NOT EXISTS (SELECT 1
					   WHERE @IN_startDate < @IN_endDate)
    	BEGIN
		RAISERROR('La fecha final esta antes que la fecha inicial.', 16, 1);
		END;

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- INSERT Course_Details
		INSERT INTO [dbo].[Course_Details]
			([IdLocations], 
			 [IdTeachers], 
			 [IdCourses], 
			 [IdPrograms], 
			 [IdSchedule], 
			 [IdModality], 
			 [StartDate], 
			 [EndDate], 
			 [Notes],
			 [Deleted])
		VALUES(@IN_IdLocation,
			   @IN_IdTeachers,
			   @IN_IdCourses,
			   1,
			   @IN_IdSchedule,
			   @IN_IdModality,
			   @IN_startDate,
			   @IN_endDate,
			   @IN_notes,
			   0);

        
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
