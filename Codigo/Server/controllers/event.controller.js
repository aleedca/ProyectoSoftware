const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getModalitys = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Modality_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getModality = async (req, res) => {
    res.send("obteniendo un Modality");
}

const addModality = async (req, res) => {
    res.send("obteniendo un Modality");
};

const editModality = async (req, res) => {
    res.send("editando un  Modality");
}

const deleteModality = (req, res) => {
    res.send("eliminando un Modality");
}

module.exports = { getModalitys, getModality, addModality, editModality, deleteModality };