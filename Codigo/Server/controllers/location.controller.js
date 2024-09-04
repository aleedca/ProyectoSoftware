const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getLocations = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Locations_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getLocation = async (req, res) => {
    res.send("obteniendo un location");
}

const addLocation = async (req, res) => {
    res.send("obteniendo un location");
};

const editLocation = async (req, res) => {
    res.send("editando un  location");
}

const deleteLocation = (req, res) => {
    res.send("eliminando un location");
}

module.exports = { getLocations, getLocation, addLocation, editLocation, deleteLocation };