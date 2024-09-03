const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getGroups = async (req, res) => {
    res.send("obteniendo todos los grupos");
}

const getGroup = async (req, res) => {
    res.send("obteniendo un grupo");
}

const addGroup = async (req, res) => {
    try {
        const pool = await getConnection()
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(64), req.body['nombre'])
            .execute('InloTEC_SP_Groups_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}       

const editGroup = async (req, res) => {
    res.send("editando un grupo");
}

const deleteGroup = (req, res) => {
    res.send("eliminando un grupo");
}

module.exports = { getGroups, getGroup, addGroup, editGroup, deleteGroup };