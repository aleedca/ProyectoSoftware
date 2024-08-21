const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getUsers = async (req, res) => {
    res.send("obteniendo todas las cuentas");
};

const getUser = async (req, res) => {
    try {
        const pool = await getConnection()
        console.log(req.query)

        let result = await pool.request()
            .input('IN_Passwordhash', sql.NVarChar(32), req.query['contrasenna'])
            .input('IN_Email', sql.NVarChar(128), req.query['correo'])
            .execute('InloTEC_SP_Users_Get'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Usuario obtenido');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const addUser = async (req, res) => {
    try {
        const pool = await getConnection()
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(32), req.body['nombre'])
            .input('IN_lastName1', sql.NVarChar(32), req.body['primerApellido'])
            .input('IN_lastName2', sql.NVarChar(32), req.body['segundoApellido'])
            .input('IN_passwordhash', sql.NVarChar(32), req.body['contrasenna'])
            .input('IN_email', sql.NVarChar(128), req.body['correo'])
            .execute('InloTEC_SP_Users_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const editUser = async (req, res) => {
    res.send("editando una cuenta");
};

const deleteUser = (req, res) => {
    res.send("eliminando una cuenta");
}

module.exports = { getUsers, getUser, addUser, editUser, deleteUser };