-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to add a Course_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Edit]
	-- Parameters
	@IN_IdCourses_Details BIGINT,
	@IN_IdLocation BIGINT,
	@IN_IdTeachers BIGINT,
	@IN_IdCourses BIGINT,
	@IN_IdSchedule BIGINT,
	@IN_IdModality BIGINT,
	@IN_IdGroup BIGINT,
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
	DECLARE @Collision BIT = 0
	DECLARE @IdCourses_Details INT

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
					   FROM [dbo].[Groups] G
					   WHERE G.Id = @IN_IdGroup
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El id del grupo no existe.', 16, 1);
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

		-- INSERT Course_Details
		INSERT INTO [dbo].[Courses_Details]
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

		SET @IdCourses_Details = SCOPE_IDENTITY()

		INSERT INTO [dbo].[Courses_Details_Groups] ([IdGroups], [IdCourses_Details], [Deleted])
		VALUES(@IN_IdGroup, @IdCourses_Details, 0)

			

        
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
