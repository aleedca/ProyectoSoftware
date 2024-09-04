const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getCourses = async (req, res) => {
    res.send("obteniendo todos los cursos");
}

const getCourse = async (req, res) => {
    res.send("obteniendo un curso");
}

const addCourse = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body);

        let result = await pool.request()
            
            .input('IN_IdLocation', sql.BigInt, req.body['idUbicacion'])
            .input('IN_IdTeachers', sql.BigInt, req.body['idProfesores'])
            .input('IN_IdCourses', sql.BigInt, req.body['idCursos'])
            .input('IN_IdSchedule', sql.BigInt, req.body['idHorario'])
            .input('IN_IdModality', sql.BigInt, req.body['idModalidad'])
            .input('IN_IdGroup', sql.BigInt, req.body['idGrupo'])
            .input('IN_StartDate', sql.Date, req.body['fechaInicio'])
            .input('IN_EndDate', sql.Date, req.body['fechaFinal'])
            .input('IN_Notes', sql.NVarChar(512), req.body['notes'] || null) // Maneja valores NULL si no se proporcionan notas
            .execute('InloTEC_SP_Courses_Details_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
};

const editCourse = async (req, res) => {
    res.send("editando un curso");
}

const deleteCourse = (req, res) => {
    res.send("eliminando un curso");
}

module.exports = { getCourses, getCourse, addCourse, editCourse, deleteCourse };