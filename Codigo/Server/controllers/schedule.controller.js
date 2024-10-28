const { getConnection } = require('../connection.js');
const sql = require('mssql');


const getSchedules = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Schedule_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getSchedule = async (req, res) => {
    res.send("obteniendo un horario");
}

const addSchedule = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)

        // Convierte el array de días a un string separado por comas
        const diasString = req.body['dias'].join(',');
        console.log(req.body['horaInicio']);
        console.log(req.body['horaFin']);

        const baseDate = '1970-01-01'; // Fecha ficticia
        const completar = '.000'; // Fecha ficticia
        const formattedHoraInicio = `${baseDate} ${req.body['horaInicio']}${completar}`;
        const formattedHoraFin = `${baseDate} ${req.body['horaFin']}${completar}`;

        // Convierte las horas a objetos Date y luego a UTC
        //const formattedHoraInicio = new Date(`${baseDate}T${req.body['horaInicio']}:00.000Z`);
        //const formattedHoraFin = new Date(`${baseDate}T${req.body['horaFin']}:00.000Z`);

        //console.log('Hora Inicio (UTC):', formattedHoraInicio.toISOString());
       //console.log('Hora Fin (UTC):', formattedHoraFin.toISOString());

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(128), req.body['nombreHorario'])
            .input('IN_IdDays', sql.NVarChar(128), diasString)
            .input('IN_startTime', sql.DateTime, formattedHoraInicio) // Pasa la hora con el formato correcto
            .input('IN_endTime', sql.DateTime, formattedHoraFin) // Pasa la hora con el formato correcto
            .execute('InloTEC_SP_Schedule_Add');

        console.log(result);
        res.status(200).send('Grupo eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const editSchedule = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)

        // Convierte el array de días a un string separado por comas
        const diasString = req.body['dias'].join(',');
        // Convierte las horas a un formato correcto de SQL Time (HH:mm:ss)
        console.log(req.body['horaInicio']);
        console.log(req.body['horaFin']);

        const baseDate = '1970-01-01'; // Fecha ficticia
        const completar = '.000'; // Fecha ficticia
        const formattedHoraInicio = `${baseDate} ${req.body['horaInicio']}${completar}`;
        const formattedHoraFin = `${baseDate} ${req.body['horaFin']}${completar}`;

        console.log(formattedHoraInicio);
        console.log(formattedHoraFin);
        console.log(req.body['nombreHorario']);

        let result = await pool.request()
            .input('IN_IdSchedule', sql.BigInt, req.body['idHorario'])
            .input('IN_newName', sql.NVarChar(128), req.body['nombreHorario'])
            .input('IN_newIdDays', sql.NVarChar(128), diasString)
            .input('IN_newStartTime', sql.DateTime, formattedHoraInicio) // Pasa la hora con el formato correcto
            .input('IN_newEndTime', sql.DateTime, formattedHoraFin) // Pasa la hora con el formato correcto
            .execute('InloTEC_SP_Schedule_Edit');

        console.log(result);
        res.status(200).send('Grupo eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const deleteSchedule = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body)

        let result = await pool.request()
            .input('IN_IdSchedule', sql.BigInt, req.body['idHorario'])
            .execute('InloTEC_SP_Schedule_Delete');

        console.log(result);
        res.status(200).send('Grupo eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

module.exports = { getSchedules, getSchedule, addSchedule, editSchedule, deleteSchedule };