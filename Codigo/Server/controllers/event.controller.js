const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getEvents = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Event_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getEvent = async (req, res) => {
    res.send("obteniendo un Event");
}

const addEvent = async (req, res) => {
    res.send("obteniendo un Event");
};

const editEvent = async (req, res) => {
    res.send("editando un  Event");
}

const deleteEvent = (req, res) => {
    res.send("eliminando un Event");
}

module.exports = { getEvents, getEvent, addEvent, editEvent, deleteEvent };