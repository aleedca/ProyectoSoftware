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
    try {
        const pool = await getConnection();
        console.log(req.body)
        const primerDiaInicio = req.body['diaInicio'].substring(0, 10);
        const primerDiaFin = req.body['diaFin'].substring(0, 10);

        const baseHour1 = '00:00:00'; 
        const baseHour2 = '23:00:00'; 
        const completar = '.000'; 
        const formattedDiaInicio = `${primerDiaInicio} ${baseHour1}${completar}`;
        const formattedDiaFin = `${primerDiaFin} ${baseHour2}${completar}`;

        console.log(formattedDiaInicio)
        console.log(formattedDiaFin)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(256), req.body['nombreEvento'])
            .input('IN_startDatetime', sql.DateTime, formattedDiaInicio) // Pasa la hora con el formato correcto
            .input('IN_endDatetime', sql.DateTime, formattedDiaFin) // Pasa la hora con el formato correcto
            .execute('InloTEC_SP_Holidays_Add');

        console.log(result);
        res.status(200).send('Evento eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const editHoliday = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)
        const primerDiaInicio = req.body['diaInicio'].substring(0, 10);
        const primerDiaFin = req.body['diaFin'].substring(0, 10);

        const baseHour1 = '00:00:00'; 
        const baseHour2 = '23:00:00'; 
        const completar = '.000'; 
        const formattedDiaInicio = `${primerDiaInicio} ${baseHour1}${completar}`;
        const formattedDiaFin = `${primerDiaFin} ${baseHour2}${completar}`;

        console.log(formattedDiaInicio)
        console.log(formattedDiaFin)

        let result = await pool.request()
            .input('IN_IdHolidays', sql.BigInt, req.body['idEvento'])
            .input('IN_newName', sql.NVarChar(256), req.body['nombreEvento'])
            .input('IN_startDatetime', sql.DateTime, formattedDiaInicio) // Pasa la hora con el formato correcto
            .input('IN_endDatetime', sql.DateTime, formattedDiaFin) // Pasa la hora con el formato correcto
            .execute('InloTEC_SP_Holidays_Edit');

        console.log(result);
        res.status(200).send('Evento eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const deleteHoliday = (req, res) => {
    res.send("eliminando un Event");
}

module.exports = { getHolidays, getHoliday, addHoliday, editHoliday, deleteHoliday };