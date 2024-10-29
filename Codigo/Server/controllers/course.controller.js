const { getConnection } = require('../connection.js');
const sql = require('mssql');

const getCourses = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('InloTEC_SP_Courses_Details_List');
        res.json(result.recordset);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getCoursesCalendar = async (req, res) => {
    try {
        const pool = await getConnection();
        const result1 = await pool.request().execute('InloTEC_SP_Courses_Details_List');




        let result = [];

        for (const resultBD of result1.recordset) {



            let currentDate = new Date(resultBD['StartDate']);

            dicDias = {
                'Domingo': 0,
                'Lunes': 1,
                'Martes': 2,
                'Miércoles': 3,
                'Jueves': 4,
                'Viernes': 5,
                'Sabado': 6
            }
            var listadias = []
            for (dia in resultBD['Days'].split(",")) {
                console.log(resultBD['Days'][dia])
                listadias.push(dicDias[resultBD['Days'].split(",")[dia]])
            }
            console.log("///////")
            console.log(resultBD['Days'])
            console.log(listadias)
            console.log(resultBD['StartTime'])
            console.log(resultBD['EndTime'])
            // Asegurarse de que la fecha de inicio no sea posterior a la fecha de fin
            while (currentDate <= new Date(resultBD['EndDate'])) {
                let dayOfWeek = currentDate.getDay(); // 0: domingo, 1: lunes, 2: martes, etc.

                if (listadias.includes(dayOfWeek)) { // 2: martes, 4: jueves
                    console.log('dsd')
                    console.log(dayOfWeek)
                    console.log(listadias)
                    let StartTime = new Date(resultBD['StartTime']);
                    let EndTime = new Date(resultBD['EndTime']);
                    let date1 = new Date(currentDate);
                    let date2 = new Date(currentDate);

                    date1.setHours(StartTime.getHours());
                    date1.setMinutes(StartTime.getMinutes());
                    date1.setSeconds(StartTime.getSeconds());
                    date1.setMilliseconds(StartTime.getMilliseconds());

                    date2.setHours(EndTime.getHours());
                    date2.setMinutes(EndTime.getMinutes());
                    date2.setSeconds(EndTime.getSeconds());
                    date2.setMilliseconds(EndTime.getMilliseconds());

                    result.push({
                        title: resultBD['Course'],
                        start: date1,
                        end: date2,
                        color: '#' + resultBD['Color'],
                    });
                }

                // Avanzar al siguiente día
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }




        res.json(result);
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

const getCourse = async (req, res) => {
    res.send("obteniendo un curso");
}

const addCourse = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body);

        let result = await pool.request()

            .input('IN_IdLocation', sql.BigInt, req.body['idUbicacion'])
            .input('IN_IdTeachers', sql.BigInt, req.body['idProfesores'])
            .input('IN_IdCourses', sql.BigInt, req.body['idCursos'])
            .input('IN_IdSchedule', sql.BigInt, req.body['idHorario'])
            .input('IN_IdModality', sql.BigInt, req.body['idModalidad'])
            .input('IN_IdGroup', sql.BigInt, req.body['idGrupo'])
            .input('IN_StartDate', sql.Date, req.body['fechaInicio'])
            .input('IN_EndDate', sql.Date, req.body['fechaFinal'])
            .input('IN_Notes', sql.NVarChar(512), req.body['notes'] || null) // Maneja valores NULL si no se proporcionan notas
            .execute('InloTEC_SP_Courses_Details_Add'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Registro creado');
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
};

const editCourse = async (req, res) => {
    res.send("editando un curso");
}

const deleteCourse = (req, res) => {
    res.send("eliminando un curso");
}

const fusionCourses = async (req, res) => {
    try {
        const pool = await getConnection();
        console.log(req.body);

        let result = await pool.request()

            .input('IN_IdCourses_Details_1', sql.BigInt, req.body['data']['idCurso1'])
            .input('IN_IdCourses_Details_2', sql.BigInt, req.body['data']['idCurso2'])
            .input('IN_opcionToDelete', sql.Bit, req.body['data']['opcion'])
            .execute('InloTEC_SP_Courses_Details_Fusion'); // Nombre del procedimiento almacenado

        console.log(result); // Muestra el resultado
        res.status(200).send('Fusion realizada');
        
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        console.error('Error al ejecutar el query:', errorMessage);
        res.status(500).send(errorMessage);
    }
}

module.exports = { getCourses, getCourse, addCourse, editCourse, deleteCourse, getCoursesCalendar, fusionCourses };