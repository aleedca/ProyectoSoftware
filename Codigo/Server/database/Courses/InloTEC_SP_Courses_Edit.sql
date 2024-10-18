-- Autor:       Luis Molina
-- Fecha:       2024-09-21
-- Descripci�n: Procedure to add a Courses
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Edit]
	-- Parameters
    @IN_IdCourses BIGINT,
	@IN_newIdPrograms NVARCHAR(128) = NULL, -- 1,2,3,4
	@IN_newName NVARCHAR(128) = NULL,
	@IN_newColorValue NVARCHAR(32) = NULL
	

AS
BEGIN
	SET NOCOUNT ON;
	-- No metadata returned

	-- ERROR HANDLING
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @Message VARCHAR(200);
	DECLARE @transactionBegun BIT = 0;

	-- VARIABLE DECLARATION
	DECLARE @Rolname NVARCHAR(64) = 'Admin';
	DECLARE @IdCourses BIGINT = NULL;
	DECLARE @TablePrograms TABLE (
		Id INT UNIQUE NOT NULL);

	BEGIN TRY
        -- VALIDATIONS

        

        -- Check if the IdCourses is already registered and active
		IF NOT EXISTS (SELECT 1 
					   FROM [dbo].[Courses]
					   WHERE Id = @IN_IdCourses
    	               AND Deleted = 0)
    	    BEGIN
    	        RAISERROR('El curso indicado para modificación no fue encontrado.', 16, 1);
    	    END;

        -- get the already existing courses data
        SELECT @IN_newName = CASE WHEN @IN_newName IS NULL 
								  THEN C.Name 
								  ELSE @IN_newName END, 
               @IN_newColorValue = CASE WHEN @IN_newColorValue IS NULL 
								  THEN C.ColorValue 
								  ELSE @IN_newColorValue END,
               @IN_newIdPrograms =  CASE WHEN @IN_newIdPrograms IS NULL 
								  THEN A.IdPrograms 
								  ELSE @IN_newIdPrograms END
        FROM Courses C
        INNER JOIN (SELECT CP.IdCourses AS 'IdCourses', STRING_AGG(CP.IdPrograms,',') AS 'IdPrograms'
                    FROM Courses_Programs CP
                    WHERE CP.IdCourses = @IN_IdCourses
                    AND CP.Deleted = 0
                    GROUP BY CP.IdCourses) AS A ON A.IdCourses = C.id
        WHERE C.Id = @IN_IdCourses
        AND C.Deleted = 0


		-- check for wrong input data type
        IF ISNUMERIC(@IN_newName) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_newName)) = '' OR
		   LTRIM(RTRIM(@IN_newColorValue)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
	END;

		-- check for correct ColorValue 
        IF NOT (LEN(LTRIM(RTRIM(@IN_newColorValue))) = 6 AND LTRIM(RTRIM(@IN_newColorValue)) LIKE '[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]')
        BEGIN
		RAISERROR('Formato incorrecto en el color. Por favor,use: [0-9A-Fa-f]{6}.', 16, 1);
	END;

		-- Check if the name is already registered and active
        IF EXISTS (SELECT 1
				   FROM [dbo].[Courses]
				   WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_newName)))
				   AND Deleted = 0 )
        BEGIN
		RAISERROR('El nombre ya está registrado. Por favor, utilice otro.', 16, 1);
	END;

		-- Check if the ColorValue is already registered and active
        IF EXISTS (SELECT 1
				   FROM [dbo].[Courses]
				   WHERE LOWER([ColorValue]) = LOWER(LTRIM(RTRIM(@IN_newColorValue)))
				   AND Deleted = 0 )
        BEGIN
		RAISERROR('El color ya está registrado. Por favor, utilice otro.', 16, 1);
	END;

		-- check if all idPrograms exists
		BEGIN TRY

			-- Parse of @IN_newIdPrograms to check for repited days
			-- and for posterior analisis
			INSERT INTO @TablePrograms (Id)
			SELECT CAST(A.Idstr AS INT) 
			FROM (SELECT TRIM(VALUE) AS 'Idstr' 
				  FROM STRING_SPLIT(@IN_newIdPrograms, ',')) AS A

		END TRY
		BEGIN CATCH
			RAISERROR('Se repite alguna instancia de tecnicos.', 16, 1);
		END CATCH
		

		IF EXISTS (SELECT 1
				   FROM [dbo].[Programs] P
				   RIGHT JOIN @TablePrograms TP ON TP.Id = P.Id AND P.Deleted = 0 
				   WHERE P.id IS NULL)
        BEGIN
		RAISERROR('Almenos un tecnico a registrar no existe.', 16, 1);
	END;
        

        -- TRANSACTION BEGUN
        IF @@TRANCOUNT = 0
        BEGIN
		SET @transactionBegun = 1;
		BEGIN TRANSACTION;
	END;

        --DELETE previos programs
		-- this is done this way because of the complexity
		-- of knowing when to do nothing, add or remove.

		UPDATE Courses_Programs
		SET Deleted = 1
		WHERE IdCourses = @IN_IdCourses


		-- update to Courses
		UPDATE Courses
		SET
			[Name] = LTRIM(RTRIM(@IN_newName)),
			[ColorValue] = UPPER(LTRIM(RTRIM(@IN_newColorValue)))
		
		-- Insert to Courses_Programs
		INSERT INTO Courses_Programs ([IdPrograms],[IdCourses],[Deleted])
		SELECT TP.Id, @IN_IdCourses, 0
		FROM @TablePrograms TP
		
        
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
