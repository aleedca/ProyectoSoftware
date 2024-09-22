-- Autor:       Luis Molina
-- Fecha:       2024-09-21
-- Descripci�n: Procedure to add a Courses
--------------------------------------------------------------------------

CREATE OR ALTER PROCEDURE [dbo].[InloTEC_SP_Courses_Add]
	-- Parameters
	@IN_IdPrograms NVARCHAR(128), -- 1,2,3,4
	@IN_name NVARCHAR(128),
	@IN_ColorValue NVARCHAR(32)
	

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

		-- check for wrong input data type
        IF ISNUMERIC(@IN_name) = 1
        BEGIN
		RAISERROR('Todos los campos deben ser texto. Por favor, complete cambie la información.', 16, 1);
	END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_name)) = '' OR
		   LTRIM(RTRIM(@IN_ColorValue)) = ''
        BEGIN
		RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
	END;

		-- check for correct ColorValue 
        IF LTRIM(RTRIM(@IN_ColorValue)) LIKE '[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]'
        BEGIN
		RAISERROR('Formato incorrecto en el color del numero. Por favor,use: [0-9A-Fa-f]{6}.', 16, 1);
	END;

		-- Check if the name is already registered and active
        IF EXISTS (SELECT 1
				   FROM [dbo].[Courses]
				   WHERE LOWER([Name]) = LOWER(LTRIM(RTRIM(@IN_name)))
				   AND Deleted = 0 )
        BEGIN
		RAISERROR('El nombre ya está registrado. Por favor, utilice otro.', 16, 1);
	END;

		-- Check if the ColorValue is already registered and active
        IF EXISTS (SELECT 1
				   FROM [dbo].[Courses]
				   WHERE LOWER([ColorValue]) = LOWER(LTRIM(RTRIM(@IN_ColorValue)))
				   AND Deleted = 0 )
        BEGIN
		RAISERROR('El color ya está registrado. Por favor, utilice otro.', 16, 1);
	END;

		-- check if all idPrograms exists
		BEGIN TRY

			-- Parse of @IN_IdPrograms to check for repited days
			-- and for posterior analisis
			INSERT INTO @TablePrograms (Id)
			SELECT CAST(A.Idstr AS INT) 
			FROM (SELECT TRIM(VALUE) AS 'Idstr' 
				  FROM STRING_SPLIT(@IN_IdPrograms, ',')) AS A

		END TRY
		BEGIN CATCH
			RAISERROR('Se repite alguna instancia de tecnicos.', 16, 1);
		END CATCH
		

		IF EXISTS (SELECT 1
				   FROM [dbo].[Programs]
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

		-- Insert to Courses
		INSERT INTO Courses([Name],[ColorValue],[Deleted])
		VALUES (
			LTRIM(RTRIM(@IN_name)),
			UPPER(LTRIM(RTRIM(@IN_ColorValue))),
			0
		)
		
		SET @IdCourses = SCOPE_IDENTITY();
		--
		-- Insert to Courses_Programs
		INSERT INTO Courses_Programs ([idPrograms],[IdCourses],[Deleted])
		SELECT TP.Id, @IdCourses, 0
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
