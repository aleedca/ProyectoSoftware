-- Autor:       Luis Molina
-- Fecha:       2024-09-1
-- Descripci�n: Procedure to delete a Course_Details
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Details_Delete]
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
	DECLARE @Rolname NVARCHAR(64) = 'Admin';

	BEGIN TRY
        -- VALIDATIONS

		-- Check if the id exists
    	IF NOT EXISTS (SELECT 1
					   FROM [dbo].[Courses_Details] CD
					   WHERE CD.Id = @IN_IdCourses_Details
					   AND Deleted = 0)
    	BEGIN
		RAISERROR('El detalle del curso no existe. Por favor, utilice otro identificador.', 16, 1);
		END;


		--validation of user rol



        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

		--the Courses_Details is deleted
		UPDATE [dbo].[Courses_Details]
		SET  
		    Deleted = 1
		WHERE Id = @IN_IdCourses_Details

		UPDATE [dbo].[Courses_Details_Groups]
		SET  
		    Deleted = 1
		WHERE IdCourses_Details = @IN_IdCourses_Details

        
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
