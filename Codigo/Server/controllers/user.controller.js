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
        res.status(200).send(result.recordset);
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
    console.log(req.body)
    
    try {
        const pool = await getConnection()
        console.log(req.body)
        console.log(req.body['correo'])
        console.log(req.body['contrasenna'])

        let result = await pool.request()
            .input('IN_oldPasswordhash', sql.NVarChar(32), req.body['contrasenna'])
            .input('IN_oldEmail', sql.NVarChar(128), req.body['correo'])
            .input('IN_newName', sql.NVarChar(32), req.body['nombre'])
            .input('IN_newLastName1', sql.NVarChar(32), req.body['primerApellido'])
            .input('IN_newLastName2', sql.NVarChar(32), req.body['segundoApellido'])
            .input('IN_newPasswordhash', sql.NVarChar(32), req.body['nuevaContrasenna'])
            .execute('InloTEC_SP_Users_Edit'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
};



const deleteUser = async (req, res) => {
    const { contrasenna, correo } = req.query;
    console.log("Contraseña:", contrasenna);
    console.log("Correo:", correo);
    
    try {
        const pool = await getConnection()
        console.log(req.body)
        console.log(req.body['correo'])
        console.log(req.body['contrasenna'])

        let result = await pool.request()
            .input('IN_passwordhash', sql.NVarChar(32), contrasenna)
            .input('IN_email', sql.NVarChar(128), correo)
            .execute('InloTEC_SP_Users_Delete'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

module.exports = { getUsers, getUser, addUser, editUser, deleteUser };