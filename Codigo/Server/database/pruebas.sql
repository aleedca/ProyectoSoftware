SELECT 
    c.name AS COLUMN_NAME, 
    t.name AS DATA_TYPE, 
    c.max_length AS MAX_LENGTH
FROM 
    sys.columns c
JOIN 
    sys.types t ON c.user_type_id = t.user_type_id
WHERE 
    c.object_id = OBJECT_ID('Modality') 
    AND (t.name IN ('varchar', 'nvarchar', 'char', 'nchar'));

    SELECT 
    name AS TABLE_NAME 
FROM 
    sys.tables;

SELECT 
    c.name AS COLUMN_NAME, 
    t.name AS DATA_TYPE, 
    c.max_length AS MAX_LENGTH, 
    c.is_nullable AS IS_NULLABLE
FROM 
    sys.columns c
JOIN 
    sys.types t ON c.user_type_id = t.user_type_id
WHERE 
    c.object_id = OBJECT_ID('Courses');


ALTER TABLE Courses
ALTER COLUMN Deleted BIT NOT NULL;

SELECT 
    c.name AS COLUMN_NAME, 
    t.name AS DATA_TYPE, 
    c.max_length AS MAX_LENGTH, 
    c.is_nullable AS IS_NULLABLE
FROM 
    sys.columns c
JOIN 
    sys.types t ON c.user_type_id = t.user_type_id
WHERE 
    c.object_id = OBJECT_ID('Courses_Programs');