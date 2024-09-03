const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getGroups = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Groups_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
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
        res.status(200).send('Grupo creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}       

const editGroup = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)

        let result = await pool.request()
            .input('IN_oldName', sql.NVarChar(64), req.body[nombreviejo])
            .input('IN_newName', sql.NVarChar(64), req.body[nombrenuevo])
            .execute('InloTEC_SP_Groups_Edit');

        console.log(result);
        res.status(200).send('Grupo modificado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(64), req.body[nombre])
            .execute('InloTEC_SP_Groups_Delete');

        console.log(result);
        res.status(200).send('Grupo eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

module.exports = { getGroups, getGroup, addGroup, editGroup, deleteGroup };