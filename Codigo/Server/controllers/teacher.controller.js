const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getTeachers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Teachers_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getTeacher = async (req, res) => {
    res.send("obteniendo un curso");
}

const addTeacher = async (req, res) => {
    try {
        const pool = await getConnection()
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(128), req.body['nombre'])
            .input('IN_email', sql.NVarChar(128), req.body['correo'])
            .execute('InloTEC_SP_Teachers_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const editTeacher = async (req, res) => {
    res.send("editando un curso");
}

const deleteTeacher = (req, res) => {
    res.send("eliminando un curso");
}

module.exports = { getTeachers, getTeacher, addTeacher, editTeacher, deleteTeacher };