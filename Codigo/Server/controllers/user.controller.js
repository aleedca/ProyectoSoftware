const { executeSQLFile } = require('../connection.js');
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
        const filePath = path.join(__dirname, '../database/InloTEC_SP_Users_Add.sql');
        const result = await executeSQLFile(filePath);
    } catch (error) {
        console.error('Error al ejecutar el query:', error);
        res.status(500).send('Error al ejecutar el query');
    }
}

const updateUser = (req, res) => {
    res.send("actualizando una cuenta");
}

const deleteUser = (req, res) => {
    res.send("eliminando una cuenta");
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };