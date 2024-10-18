-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to fusion 2 Courses_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Fusion]
	-- Parameters
	@IN_IdCourses_Details_1 BIGINT, --0
	@IN_IdCourses_Details_2 BIGINT, -- 1
	@IN_opcionToDelete BIT
	

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @Notes NVARCHAR(512);
	DECLARE @IdGroup_1 INT	
	DECLARE @IdGroup_2 INT

	BEGIN TRY
        -- VALIDATIONS

		-- Check every id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   WHERE CD.Id = @IN_IdCourses_Details_1
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El identificador 1 del curso no se encontro.', 16, 1);
		END;

		-- Check every id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   WHERE CD.Id = @IN_IdCourses_Details_2
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El identificador 2 del curso no se encontro.', 16, 1);
		END;

		--the courses must have the same course

    	IF NOT EXISTS (SELECT 1
		   FROM (SELECT CD.IdCourses AS 'IdCourses'
			 FROM [dbo].[Courses_Details] CD
			 WHERE CD.Id = @IN_IdCourses_Details_1
			 AND Deleted = 0) A
		   JOIN (SELECT CD.IdCourses AS 'IdCourses'
			 FROM [dbo].[Courses_Details] CD
			 WHERE CD.Id = @IN_IdCourses_Details_2
			 AND Deleted = 0) B ON 1 = 1
		   WHERE A.IdCourses = B.IdCourses)
    	BEGIN
		RAISERROR('Los cursos a fusionar son de diferentes materias.', 16, 1);
		END;


		--the courses must have the same dates

    	IF NOT EXISTS (SELECT 1 
			FROM (SELECT CAST(CD.StartDate AS DATE) AS 'StartDate', 
						 CAST(CD.EndDate AS DATE) AS 'EndDate'
			 	  FROM [dbo].[Courses_Details] CD
			      WHERE CD.Id = @IN_IdCourses_Details_1
			      AND Deleted = 0) A
		   	JOIN (SELECT CAST(CD.StartDate AS DATE) AS 'StartDate', 
						 CAST(CD.EndDate AS DATE) AS 'EndDate'
			 	  FROM [dbo].[Courses_Details] CD
			      WHERE CD.Id = @IN_IdCourses_Details_2
			      AND Deleted = 0) B ON 1 = 1
		   WHERE A.StartDate = B.StartDate
		   AND A.EndDate = B.EndDate)
    	BEGIN
		RAISERROR('Los cursos a fusionar tienen diferentes fechas.', 16, 1);
		END;
				

		--Combinate the notes of both course_details in a variable

		SELECT @Notes = RTRIM(LTRIM(STRING_AGG(RTRIM(LTRIM(CD.Notes)),' ')))
		FROM Courses_Details CD
		WHERE (CD.Id = @IN_IdCourses_Details_1 
			   OR CD.Id = @IN_IdCourses_Details_2)

		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		--Move the Course_Details_Groups to be assign to the same Course_Details
		UPDATE Courses_Details_Groups
		SET IdCourses_Details = CASE WHEN @IN_opcionToDelete = 0 THEN @IN_IdCourses_Details_2 ELSE @IN_IdCourses_Details_1 END
		WHERE (@IN_opcionToDelete = 0 
			   AND IdCourses_Details = @IN_IdCourses_Details_1)
		OR (@IN_opcionToDelete = 1 
			   AND IdCourses_Details = @IN_IdCourses_Details_2);

		--Delete repeted Course_Details_Groups
		WITH CTE AS (SELECT Id,
        					ROW_NUMBER() OVER (PARTITION BY IdGroups ORDER BY Id) AS row_num
    				 FROM Courses_Details_Groups
    				 WHERE IdCourses_Details = CASE WHEN @IN_opcionToDelete = 0 THEN @IN_IdCourses_Details_2
        											WHEN @IN_opcionToDelete = 1 THEN @IN_IdCourses_Details_1 END
					)
		UPDATE Courses_Details_Groups
		SET Deleted = 1
		WHERE Id IN (SELECT Id 
					 FROM CTE 
					 WHERE row_num > 1
					);

        
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
