
        DECLARE @IN_Passwordhash NVARCHAR(32) = 'admin';
        DECLARE @IN_Email NVARCHAR(128) = 'admin@admin.com';
        DECLARE @UserId INT = NULL;

		-- check for wrong input data type
        IF ISNUMERIC(@IN_Passwordhash) = 1 OR
           ISNUMERIC(@IN_Email) = 1
        BEGIN
            RAISERROR('Todos los campos deben ser texto. Por favor, cambie la información.', 16, 1);
        END;

		-- check for empty input data
        IF LTRIM(RTRIM(@IN_Passwordhash)) = '' OR
           LTRIM(RTRIM(@IN_Email)) = ''
        BEGIN
            RAISERROR('Todos los campos son obligatorios. Por favor, complete la información.', 16, 1);
        END;

        -- Check if the user is already registered and active
        IF NOT EXISTS (SELECT 1 
				   FROM [dbo].[Users] 
				   WHERE LTRIM(RTRIM(Email)) = LTRIM(RTRIM(@IN_Email))
				   AND LTRIM(RTRIM(@IN_Passwordhash)) = LTRIM(RTRIM(Passwordhash))
				   AND Deleted = 0)
        BEGIN
            RAISERROR('El usuario no fue encontrado.', 16, 1);
        END;

		--get the user id
		SELECT @UserId = U.id
		FROM [dbo].[Users] U
		WHERE LTRIM(RTRIM(Email)) = LTRIM(RTRIM(@IN_Email))
		AND LTRIM(RTRIM(@IN_Passwordhash)) = LTRIM(RTRIM(Passwordhash))
		AND Deleted = 0

		SELECT U.Name, U.LastName1, U.LastName2, A.Rol AS 'Rol'
		FROM [dbo].[Users] U
		INNER JOIN (SELECT UR.IdUsers,
					STRING_AGG(R.Name, ',') AS 'Rol'
					FROM [dbo].[Roles] R
					INNER JOIN [dbo].[Users_Roles] UR ON UR.IdRoles = R.Id
					INNER JOIN [dbo].[Users] U ON U.Id = UR.IdUsers
					WHERE U.Id = @UserId
					AND UR.Deleted = 0
					GROUP BY UR.IdUsers) AS A ON A.IdUsers = U.Id
		WHERE U.Id = @UserId