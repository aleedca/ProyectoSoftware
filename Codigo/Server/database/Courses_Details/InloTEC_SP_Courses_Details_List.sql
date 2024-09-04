-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to list all of the Course_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_List]
	-- Parameters

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


		--validation of user rol


		--Response
		SELECT CD.Id, 
			   L.Name AS 'Location', 
			   T.Name AS 'Teacher', 
			   C.Name AS 'Course',
			   A.Name AS 'Group',
			   CD.IdSchedule, 
			   S.Name AS 'Schedule', 
			   M.Name AS 'Modality', 
			   CAST(CD.StartDate AS DATE) AS 'StartDate', 
			   CAST(CD.EndDate AS DATE) AS 'EndDate', 
			   CD.Notes
		FROM Courses_Details CD
		INNER JOIN Locations L ON L.Id = CD.IdLocations
		INNER JOIN Teachers T ON T.Id = CD.IdTeachers
		INNER JOIN Courses C ON C.Id = CD.IdCourses
		INNER JOIN Programs P ON P.Id = CD.IdPrograms
		INNER JOIN Modality M ON M.Id = CD.IdModality
		INNER JOIN (SELECT CDG.IdCourses_Details AS 'IdCourses_Details' ,  STRING_AGG(G.Name, ',') AS 'Name'
					FROM Courses_Details CD
					INNER JOIN Courses_Details_Groups CDG ON CDG.IdCourses_Details = CD.Id
					INNER JOIN Groups G ON G.Id = CDG.IdGroups
					GROUP BY CDG.IdCourses_Details) AS A ON A.IdCourses_Details = CD.Id
		INNER JOIN Schedule S ON S.Id = CD.IdSchedule
		WHERE CD.Deleted = 0



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
