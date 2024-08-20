const { executeSQLFile ,getConnection} = require('../connection.js');
const sql = require('mssql');
const path = require('path');

const getUsers = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../database/getUsers.sql');
        const result = await executeSQLFile(filePath);
        if (result && result.recordset) {
            res.json(result.recordset);
        } else {
            res.status(404).send('No se encontraron registros');
        }
    } catch (error) {
        console.error('Error al ejecutar el query:', error);
        res.status(500).send('Error al ejecutar el query');
    }
};

const getUser = (req, res) => {
    res.send("obteniendo una cuenta");
}

const addUser = async (req, res) => {
    try {
        //const filePath = path.join(__dirname, '../database/InloTEC_SP_Users_Add.sql');
        const pool = await  getConnection()
        console.log(req.body)
        
        let result = await pool.request()
            .input('IN_name', sql.NVarChar(32), req.body['nombre'])
            .input('IN_lastName1', sql.NVarChar(32),  req.body['primerApellido'])
            .input('IN_lastName2', sql.NVarChar(32),  req.body['segundoApellido'])
            .input('IN_passwordhash', sql.NVarChar(32),  req.body['contrasenna'])
            .input('IN_email', sql.NVarChar(128),  req.body['correo'])
            .execute('InloTEC_SP_Users_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
        //const result = await executeSQLFile(filePath);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);


        console.error('Error al ejecutar el query:', error);
        res.status(500).send(errorMessage);
    }
}

const updateUser = (req, res) => {
    res.send("actualizando una cuenta");
}

const deleteUser = (req, res) => {
    res.send("eliminando una cuenta");
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };