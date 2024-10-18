-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add a Course_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Edit]
	-- Parameters
	@IN_IdCourses_Details BIGINT,
	@IN_IdLocation BIGINT = NULL,
	@IN_IdTeachers BIGINT = NULL,
	@IN_IdCourses BIGINT = NULL,
	@IN_IdSchedule BIGINT = NULL,
	@IN_IdModality BIGINT = NULL,
	@IN_IdGroup BIGINT = NULL,
	@IN_startDate DATE = NULL,
	@IN_endDate DATE = NULL,
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
	DECLARE @Collision BIT = 0
	DECLARE @IdCourses_Details INT
	DECLARE @IN_IdPrograms BIGINT = NULL --config wired

	BEGIN TRY
        -- VALIDATIONS

		-- Check every id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   WHERE CD.Id = @IN_IdCourses_Details
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El identificador del curso no se encontro.', 16, 1);
		END;

		-- getting old information if input was NULL

		SELECT @IN_IdLocation = CASE WHEN @IN_IdLocation IS NULL 
									 THEN CD.IdLocations 
									 ELSE @IN_IdLocation END,
			   @IN_IdTeachers = CASE WHEN @IN_IdTeachers IS NULL 
			   					  THEN CD.IdTeachers 
			   					  ELSE @IN_IdTeachers END,
			   @IN_IdCourses = CASE WHEN @IN_IdCourses IS NULL 
			   						THEN CD.IdCourses 
									ELSE @IN_IdCourses END,
			   @IN_IdSchedule = CASE WHEN @IN_IdSchedule IS NULL 
			   						 THEN CD.IdSchedule 
									 ELSE @IN_IdSchedule END,
			   @IN_IdModality = CASE WHEN @IN_IdModality IS NULL 
			   						 THEN CD.IdModality 
									 ELSE @IN_IdModality END,
			   @IN_IdGroup = CASE WHEN @IN_IdGroup IS NULL 
			   					  THEN NULL 
								  ELSE @IN_IdGroup END,
			   @IN_IdPrograms = CASE WHEN @IN_IdPrograms IS NULL 
			   					  THEN CD.IdPrograms 
								  ELSE @IN_IdPrograms END, 
			   @IN_startDate = CASE WHEN @IN_startDate IS NULL 
			   						THEN CD.startDate 
									ELSE @IN_startDate END,
			   @IN_endDate = CASE WHEN @IN_endDate IS NULL 
			   				  	  THEN CD.endDate 
								  ELSE @IN_endDate END,
			   @IN_notes = CASE WHEN @IN_notes IS NULL 
			   					THEN CD.notes 
								ELSE @IN_notes END
		FROM Courses_Details CD
		WHERE CD.Id = @IN_IdCourses_Details
		AND CD.Deleted = 0


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
					   FROM [dbo].[Locations] L
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
					   FROM [dbo].[Programs] P
					   WHERE P.Id = @IN_IdPrograms
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id del Programs no existe.', 16, 1);
		END;

		IF NOT (@IN_IdGroup IS NULL)
		BEGIN
			IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Groups] G
					   WHERE G.Id = @IN_IdGroup
					   AND Deleted = 0)
    		BEGIN
			RAISERROR('El id del grupo no existe.', 16, 1);
			END;
		END;

		IF EXISTS (SELECT 1
					   WHERE @IN_startDate > @IN_endDate)
    	BEGIN
		RAISERROR('La fecha final esta antes que la fecha inicial.', 16, 1);
		END;


		--check for colision of: schedule and dates for teachers or groups
		WITH A AS (
				SELECT SDS.IdSchedule AS 'IdSchedule', 
					   D.Id AS 'Days', 
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
			)
			--table of courses, schedule day, teachers, groups, hours, dates
			SELECT @Collision = COUNT(CD.Id)
			FROM Courses_Details CD
			INNER JOIN Schedule S ON (S.Id = CD.IdSchedule AND S.Deleted = 0)
			INNER JOIN Courses_Details_Groups CDG ON (CDG.IdCourses_Details = CD.Id AND CDG.Deleted = 0)
			INNER JOIN A ON A.IdSchedule = S.Id
			JOIN A IN_A ON IN_A.IdSchedule = @IN_IdSchedule
			WHERE CD.Deleted = 0
			AND CD.Id <> @IN_IdCourses_Details --removing itself from the search for collision
			-- conditions to match for a collision; true if collision exists
			AND (NOT (@IN_endDate <= CD.StartDate OR @IN_startDate >= CD.EndDate) --dates collision; true if dates do overlap
				   AND NOT (IN_A.EndTime <= A.StartTime OR IN_A.StartTime >= A.EndTime) -- Schedule hour collision; true if hours do overlap
				   AND (IN_A.[Days] = A.[Days]) -- Schedule days collision; true if days do collisions
				   AND (CD.IdTeachers = @IN_IdTeachers 
				   		OR CDG.IdGroups = @IN_IdGroup) -- Teacher or Group collision; true if there is collisions
				  )

		IF @Collision = 1
    		BEGIN
			RAISERROR('Existe una colision del curso para el profesor o grupo.', 16, 1);
			END;


		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		-- Update Course_Details
		UPDATE [dbo].[Courses_Details]
		SET [IdLocations] = @IN_IdLocation, 
			[IdTeachers] = @IN_IdTeachers, 
			[IdCourses] = @IN_IdCourses, 
			[IdPrograms] = @IN_IdPrograms, 
			[IdSchedule] = @IN_IdSchedule, 
			[IdModality] = @IN_IdModality, 
			[StartDate] = @IN_startDate, 
			[EndDate] = @IN_endDate, 
			[Notes] = @IN_notes
		WHERE Id = @IN_IdCourses_Details

		--group is edited 
		IF NOT (@IN_IdGroup IS NULL)
		BEGIN
			-- deleted the previos associations
			UPDATE [dbo].[Courses_Details_Groups] 
			SET [Deleted] =1
			WHERE Id = @IN_IdCourses_Details

			INSERT INTO [dbo].[Courses_Details_Groups] (
				[IdGroups], 
				[IdCourses_Details], 
				[Deleted])
			VALUES(@IN_IdGroup, 
				   @IdCourses_Details, 
				   0)
		END;

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
