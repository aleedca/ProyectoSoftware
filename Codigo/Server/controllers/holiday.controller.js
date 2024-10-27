const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getHolidays = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Holidays_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getHoliday = async (req, res) => {
    res.send("obteniendo un Event");
}

const addHoliday = async (req, res) => {
    res.send("obteniendo un Event");
};

const editHoliday = async (req, res) => {
    res.send("editando un  Event");
}

const deleteHoliday = (req, res) => {
    res.send("eliminando un Event");
}

module.exports = { getHolidays, getHoliday, addHoliday, editHoliday, deleteHoliday };