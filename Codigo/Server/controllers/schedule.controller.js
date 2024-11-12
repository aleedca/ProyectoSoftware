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
        const diasOrdenados = req.body['dias'].map(Number).sort((a, b) => a - b);
        //console.log(diasOrdenados);
        const diasString = diasOrdenados.join(',');
        console.log('dias final: ',diasString);
        // Convierte las horas a un formato correcto de SQL Time (HH:mm:ss)
        console.log(req.body['nombreHorario']);
        console.log(req.body['horaInicio']);
        console.log(req.body['horaFin']);

        var [horasInicioNum] = req.body['horaInicio'].split(':').map(Number);
        var [horasFinNum] = req.body['horaFin'].split(':').map(Number);

        console.log('Horas separadas:', horasInicioNum, horasFinNum);

        // Sumar 6 horas asegurando que no se pase de 24 horas
        // Aquí se convierte a UTC para cuando se corra en Azure
        for (let i = 1; i < 7; i++) {
            horasInicioNum = horasInicioNum+1;
            horasFinNum = horasFinNum+1;
            if(horasInicioNum==24){
                horasInicioNum=0;
            }
            if(horasFinNum==24){
                horasFinNum=0;
            }
        }
        const horaInicioStr = horasInicioNum.toString().padStart(2, '0') + ':00:00';
        const horaFinStr = horasFinNum.toString().padStart(2, '0') + ':00:00';

        console.log('Hora inicio final (string):', horaInicioStr);
        console.log('Hora fin final (string):', horaFinStr);

        const baseDate = '1970-01-01'; // Fecha ficticia
        const completar = '.000'; // Fecha ficticia
        const formattedHoraInicio = `${baseDate} ${horaInicioStr}${completar}`;
        const formattedHoraFin = `${baseDate} ${horaFinStr}${completar}`;

        console.log(formattedHoraInicio);
        console.log(formattedHoraFin);

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
        const diasOrdenados = req.body['dias'].map(Number).sort((a, b) => a - b);
        //console.log(diasOrdenados);
        const diasString = diasOrdenados.join(',');
        // Convierte las horas a un formato correcto de SQL Time (HH:mm:ss)
        //console.log(req.body['horaInicio']);
        //console.log(req.body['horaFin']);
        var [horasInicioNum] = req.body['horaInicio'].split(':').map(Number);
        var [horasFinNum] = req.body['horaFin'].split(':').map(Number);

        console.log('Horas separadas:', horasInicioNum, horasFinNum);

        // Sumar 6 horas asegurando que no se pase de 24 horas
        // Aquí se convierte a UTC para cuando se corra en Azure
        for (let i = 1; i < 7; i++) {
            horasInicioNum = horasInicioNum+1;
            horasFinNum = horasFinNum+1;
            if(horasInicioNum==24){
                horasInicioNum=0;
            }
            if(horasFinNum==24){
                horasFinNum=0;
            }
        }
        const horaInicioStr = horasInicioNum.toString().padStart(2, '0') + ':00:00';
        const horaFinStr = horasFinNum.toString().padStart(2, '0') + ':00:00';

        console.log('Hora inicio final (string):', horaInicioStr);
        console.log('Hora fin final (string):', horaFinStr);

        const baseDate = '1970-01-01'; // Fecha ficticia
        const completar = '.000'; // Fecha ficticia
        const formattedHoraInicio = `${baseDate} ${horaInicioStr}${completar}`;
        const formattedHoraFin = `${baseDate} ${horaFinStr}${completar}`;

        console.log(formattedHoraInicio);
        console.log(formattedHoraFin);

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