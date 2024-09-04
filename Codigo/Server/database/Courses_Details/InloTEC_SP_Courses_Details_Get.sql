-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to get a courses details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Get]
	-- Parameters
	@IN_IdCourses_Details BIGINT

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION

	BEGIN TRY
        -- VALIDATIONS

		-- Check if the id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   WHERE CD.Id = @IN_IdCourses_Details
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El curso indicado no existe. Por favor, utilice otro identificador.', 16, 1);
		END;

		--Response
		SELECT CD.Id, 
			   L.Name AS 'Location', 
			   T.Name AS 'Teacher', 
			   C.Name AS 'Course', 
			   CD.IdSchedule, 
			   S.Name AS 'Schedule', 
			   M.Name AS 'Modality', 
			   CD.StartDate, 
			   CD.EndDate, 
			   CD.Notes
		FROM Courses_Details CD
		INNER JOIN Locations L ON L.Id = CD.IdLocations
		INNER JOIN Teachers T ON T.Id = CD.IdTeachers
		INNER JOIN Courses C ON C.Id = CD.IdCourses
		INNER JOIN Programs P ON P.Id = CD.IdPrograms
		INNER JOIN Modality M ON M.Id = CD.IdModality
		INNER JOIN (SELECT CDG.IdCourses_Details AS 'IdCourses_Details' ,  STRING_AGG(G.Name, ', ') AS 'Name'
					FROM Courses_Details CD
					INNER JOIN Courses_Details_Groups CDG ON CDG.IdCourses_Details = CD.Id
					INNER JOIN Groups G ON G.Id = CDG.IdGroups
					GROUP BY CDG.IdCourses_Details) AS A ON A.IdCourses_Details = CD.Id
		INNER JOIN Schedule S ON S.Id = CD.IdSchedule
		WHERE CD.Id = @IN_IdCourses_Details
		AND CD.Deleted = 0


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
