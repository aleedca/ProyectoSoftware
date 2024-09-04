const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getSchedules = async (req, res) => {
    /*try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Schedules_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }*/
}

const getSchedule = async (req, res) => {
    /*res.send("obteniendo un grupo");*/
}

const addSchedule = async (req, res) => {
    try {
        const pool = await getConnection()
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(128), req.body['nombre'])
            .input('IN_IdDays', sql.NVarChar(128), req.body['dias'])
            .input('IN_StartTime', sql.Time, req.body['horaInicio'])
            .input('IN_EndTime', sql.Time, req.body['horaFinal'])
            .execute('InloTEC_SP_Schedules_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Horario creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}       

const editSchedule = async (req, res) => {
    /*try {
        const pool = await getConnection();
        console.log(req.body)

        let result = await pool.request()
            .input('IN_oldName', sql.NVarChar(64), req.body['nombreviejo'])
            .input('IN_newName', sql.NVarChar(64), req.body['nombrenuevo'])
            .execute('InloTEC_SP_Schedules_Edit');

        console.log(result);
        res.status(200).send('Grupo modificado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }*/
}

const deleteSchedule = async (req, res) => {
    /*try {
        const pool = await getConnection();
        console.log(req.body)

        let result = await pool.request()
            .input('IN_name', sql.NVarChar(64), req.body['nombre'])
            .execute('InloTEC_SP_Schedules_Delete');

        console.log(result);
        res.status(200).send('Grupo eliminado')
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }*/
}

module.exports = { getSchedules, getSchedule, addSchedule, editSchedule, deleteSchedule };