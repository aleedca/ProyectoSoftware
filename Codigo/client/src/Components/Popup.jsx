import React, { cloneElement ,  useContext } from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Dropdown from './Dropdown.jsx';
import curso from '../Assets/inicio.png';
import profesor from '../Assets/gestionar_profesor.png';
import fusion from '../Assets/fusionar_cursos.png';
import grupo from '../Assets/gestionar_grupo.png';
import cerrar from '../Assets/cerrar.png';
import imaEvento from '../Assets/eventos.png';
import imaHorario from '../Assets/horario.png';
import { UserContext } from '../UserContext'; // Asegúrate de importar UserContext

function Popup({ type, closePopup, details }) {
    const { link,refrescar, setRefrescar } = useContext(UserContext); 
    const [profesores, setProfesores] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [catalogCourses, setCatalogCourses] = useState([]);
    const [locaciones, setLocaciones] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombreProfesor: '',
        correoProfesor: '',
        identificacionProfesor: '',
        idProfesor: 0,

        idGrupo: 0,
        nombreGrupo: '',

        nombreCatalagCourse: '',
        idCatalogCourse: 0,

        nombreLocacion: '',
        idLocacion: 0,

        nombreModalidad: '',
        idModalidad: 0,

        nombreHorario: '',
        idHorario: 0,
        dias: '',
        horaInicio: '',
        horaFin: '',

        fechaInicio: '',
        fechaFin: '',

        idEvento: 0,
        nombreEvento: '',
        diaInicio: '',
        diaFin: '',

        idCurso1: 0,
        idCurso2: 0,
        fusionarCursos: false
    });

    const [isError, setIsError] = useState({
        nombreProfesor: false,
        correoProfesor: false
    });

    useEffect(() => {
        // Función para obtener la lista de los detalles de los cursos
        const fetchCourses = async () => {
            try {
                const response = await axios.get(link + '/getCourses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de detalles de los cursos:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de profesores
        const fetchProfesores = async () => {
            try {
                const response = await axios.get(link + '/getTeachers');
                setProfesores(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de profesores:', error);
            }
        };

        fetchProfesores();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de profesores
        const fetchEventos = async () => {
            try {
                const response = await axios.get(link + '/getHolidays');
                setEventos(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de eventos:', error);
            }
        };

        fetchEventos();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de grupos
        const fetchGrupos = async () => {
            try {
                const response = await axios.get(link + '/getGroups');
                setGrupos(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de grupos:', error);
            }
        };

        fetchGrupos();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de grupos
        const fetchCatalogCourse = async () => {
            try {
                const response = await axios.get(link + '/getCatalogCourses');
                setCatalogCourses(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de catalogo de coursos:', error);
            }
        };

        fetchCatalogCourse();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de locaciones
        const fetchLocaciones = async () => {
            try {
                const response = await axios.get(link + '/getLocations');
                setLocaciones(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de locaciones:', error);
            }
        };

        fetchLocaciones();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de locaciones
        const fetchModalidades = async () => {
            try {
                const response = await axios.get(link + '/getModalitys');
                setModalidades(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de modalidades:', error);
            }
        };

        fetchModalidades();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de horarios
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(link + '/getSchedules');
                setHorarios(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de horarios:', error);
            }
        };

        fetchSchedules();
    }, []);

    // Función para manejar el cambio en el checkbox de fusión de cursos
    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setFormData(prevState => ({
            ...prevState,
            fusionarCursos: isChecked
        }));
    };

    // Función para manejar el cambio en la selección de cursos
    const handleSelectCourseChange = (event, courseNumber) => {
        console.log(event.target.value)
        const selectedValue = parseInt(event.target.value, 10);
        if (courseNumber === 1) {
            setFormData(prevState => ({
                ...prevState,
                idCurso1: selectedValue
            }));
        } else if (courseNumber === 2) {
            setFormData(prevState => ({
                ...prevState,
                idCurso2: selectedValue
            }));
        }
    };

    // Función para manejar el cambio de los eventos
    const handleSelectHolidayChange = (e) => {
        const selectedId = e.target.value;
        const selectedHoliday = eventos.find(evento => evento.Id === selectedId);

        if (selectedHoliday) {

            console.log(selectedHoliday.StartDatetime);
            console.log(selectedHoliday.EndDatetime);

            setFormData(prevFormData => {
                const updatedFormData = {
                    ...prevFormData,
                    nombreEvento: selectedHoliday.Name,
                    idEvento: selectedHoliday.Id,
                    diaInicio: selectedHoliday.StartDatetime.split('T')[0], // Extrae la parte de la fecha
                    diaFin: selectedHoliday.EndDatetime.split('T')[0]
                };

                return updatedFormData;
            });
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                nombreEvento: '',
                idEvento: 0,
                diaInicio: '',
                diaFin: ''
            }));
        }
    };

    // Función para manejar la creación de un evento
    const handleAddHoliday = async () => {
        const formattedDiaInicio = formatTimeForDatabase(formData.diaInicio);
        const formattedDiaFin = formatTimeForDatabase(formData.diaFin);
        try {
            const response = await axios.post(link + '/addHoliday', {
                nombreEvento: formData.nombreEvento.trim(),
                diaInicio: formattedDiaInicio,
                diaFin: formattedDiaFin
            });
            console.log('Evento creado:', response.data);
            closePopup();
            setRefrescar(!refrescar)
            alert('Evento creado correctamente');
        } catch (error) {
            
            console.error('Error al crear el evento:', error);
            alert('Hubo un error al crear el evento'+':  '+ error['response']['data'].split("-")[0]);
        }

        closePopup();
    };

    // Función para manejar la edición de un evento
    const handleEditHoliday = async () => {
        const formattedDiaInicio = formatTimeForDatabase(formData.diaInicio);
        const formattedDiaFin = formatTimeForDatabase(formData.diaFin);

        const errors = {
            idEvento: !formData.idEvento,
            nombreEvento: !formData.nombreEvento,
            diaInicio: !formData.diaInicio,
            diaFin: !formData.diaFin
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }
        const horarioConId = profesores.find(horario => horario.id === formData.idHorario);
        console.log(horarioConId)
        try {
            const response = await axios.put(link + '/editHoliday', {
                idEvento: formData.idEvento,
                nombreEvento: formData.nombreEvento.trim(),
                diaInicio: formattedDiaInicio,
                diaFin: formattedDiaFin

            });
            console.log('Evento actualizado:', response.data);
            closePopup();
            alert('Evento actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            alert('Hubo un error al actualizar el evento'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la eliminación de un evento
    const handleDeleteHoliday = async () => {
        const errors = {
            idEvento: !formData.idEvento,
            nombreEvento: !formData.nombreEvento,
            diaInicio: !formData.diaInicio,
            diaFin: !formData.diaFin
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, Seleccione un evento.');
            console.error('Por favor,  Seleccione un evento.');
            alert('Por favor,  Seleccione un evento.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.delete(link + '/deleteHoliday', {
                data: {
                    idEvento: formData.idEvento
                }
            });
            console.log('Evento Eliminado:', response.data);
            closePopup();
            alert('Evento eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            alert('Hubo un error al eliminar el evento'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar el cambio en el input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    // Función para manejar la selección del profesor
    const handleSelectTeacher = (option) => {
        const selectedProfesor = profesores.find(profesor => profesor.Name === option);
        setFormData(prevFormData => ({
            ...prevFormData,
            nombreProfesor: selectedProfesor ? selectedProfesor.Name : '',
            correoProfesor: selectedProfesor ? selectedProfesor.email : '',
            idProfesor: selectedProfesor ? selectedProfesor.id : 0
        }));
    };

    // Función para manejar el cambio en la selección del profesor
    const handleSelectTeacherChange = (e) => {
        const selectedId = e.target.value;
        const selectedTeacher = profesores.find(profesor => profesor.Id === selectedId);
        console.log('Seleccionado id: ', selectedTeacher.Id);
        console.log('Seleccionado nombre: ', selectedTeacher.name);
        console.log('Seleccionado email: ', selectedTeacher.Email);
        console.log('Seleccionado cedula: ', selectedTeacher.IdentityNumber);
        if (selectedTeacher) {
            setFormData(prevFormData => {
                const updatedFormData = {
                    ...prevFormData,
                    nombreProfesor: selectedTeacher.name,
                    idProfesor: selectedTeacher.Id,
                    correoProfesor: selectedTeacher.Email,
                    identificacionProfesor: selectedTeacher.IdentityNumber
                };
                return updatedFormData;
            });
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                nombreProfesor: '',
                idProfesor: 0,
                correoProfesor: '',
                identificacionProfesor: ''
            }));
        }
    };

    // Función para manejar el cambio en la selección del grupo
    const handleSelectGroupChange = (e) => {
        const { key, value } = e.target;
        console.log("hoolls")
        console.log(e.target)
        if (e.target.value != 0) {
            const grupoConId = grupos.find(grupo => grupo.id === e.target.value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreGrupo']: grupoConId.Name,
                ['idGrupo']: grupoConId.id
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreGrupo']: '',
                ['idGrupo']: 0
            }));
        }
    };

    // Función para manejar el cambio en la selección del curso catálogo
    const handleSelectCatalogCourseChange = (e) => {
        const { key, value } = e.target;
        console.log("-----------")
        console.log(e.target)
        console.log("key = " + key)
        console.log("value = " + value)
        if (e.target.value != 0) {
            console.log(typeof value)
            console.log(typeof catalogCourses[4]['IdCourses'])
            console.log(value)
            console.log(catalogCourses[4]['IdCourses'])
            console.log(value === catalogCourses[4]['IdCourses'])
            console.log(catalogCourses)
            const catalogCourseConId = catalogCourses.find(catalog => catalog.IdCourses === e.target.value);
            console.log(catalogCourseConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreCatalogCourse']: catalogCourseConId.Name,
                ['idCatalogCourse']: catalogCourseConId.IdCourses
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreCatalogCourse']: '',
                ['idCatalogCourse']: 0
            }));
        }
    };

    // Función para manejar el cambio en la selección de la locación
    const handleSelectLocacionChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            console.log(e.target.value)
            console.log(locaciones)
            const locacionConId = locaciones.find(locacion => locacion.Id === e.target.value);
            console.log(locacionConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreLocacion']: locacionConId.Name,
                ['idLocacion']: locacionConId.Id
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreLocacion']: '',
                ['idLocacion']: 0
            }));
        }

        console.log('Updated formData:', formData);

    };

    // Función para manejar el cambio en la selección de la modalidad
    const handleSelectModalidadChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            const modalidadConId = modalidades.find(modalidad => modalidad.id === e.target.value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreModalidad']: modalidadConId.Name,
                ['idModalidad']: modalidadConId.id
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreModalidad']: '',
                ['idModalidad']: 0
            }));
        }
    };

    // Función para manejar el cambio en la selección del horario
    const handleSelectScheduleChange = (e) => {
        const selectedId = e.target.value;
        const selectedSchedule = horarios.find(horario => horario.Id === selectedId);

        const dicDias = {
            'Domingo': 0,
            'Lunes': 1,
            'Martes': 2,
            'Miércoles': 3,
            'Jueves': 4,
            'Viernes': 5,
            'Sabado': 6
        }

        if (selectedSchedule) {
            var listadias = []
            for (var dia in selectedSchedule['Days'].split(",")) {
                listadias.push(dicDias[selectedSchedule['Days'].split(",")[dia]].toString())
            }
            console.log(listadias)
            setFormData(prevFormData => {
                const updatedFormData = {
                    ...prevFormData,
                    nombreHorario: selectedSchedule.Name,
                    idHorario: selectedSchedule.Id,
                    dias: listadias,
                    horaInicio: selectedSchedule.StartTime.split('T')[1].split(':')[0] + ':' + selectedSchedule.StartTime.split('T')[1].split(':')[1], // Extrae solo la hora
                    horaFin: selectedSchedule.EndTime.split('T')[1].split(':')[0] + ':' + selectedSchedule.StartTime.split('T')[1].split(':')[1]    // Extrae solo la hora
                };

                return updatedFormData;
            });
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                nombreHorario: '',
                idHorario: 0,
                dias: '',
                horaInicio: '',
                horaFin: ''
            }));
        }
    };

    // Función para manejar el cambio en el checkbox de los días
    const handleCheckBoxChange = (e) => {
        const { value } = e.target;

        const newSelectedDays = e.target.checked
            ? [...selectedDays, value]
            : selectedDays.filter((day) => day !== value);

        setSelectedDays(newSelectedDays);
        setFormData((prevFormData) => ({
            ...prevFormData,
            dias: newSelectedDays,
        }));
    };

    // Función para formatear la hora para la base de datos
    const formatTimeForDatabase = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}:00`;
    };

    // Función para manejar el agregar un horario
    const handleAddHorario = async () => {
        const formattedHoraInicio = formatTimeForDatabase(formData.horaInicio);
        const formattedHoraFin = formatTimeForDatabase(formData.horaFin);

        try {
            const response = await axios.post(link + '/addSchedule', {
                nombreHorario: formData.nombreHorario.trim(),
                dias: formData.dias,
                horaInicio: formattedHoraInicio,
                horaFin: formattedHoraFin
            });
            closePopup();
            alert('Horario creado correctamente');
        } catch (error) {
            console.error('Error al crear el horario:', error);
            alert('Hubo un error al crear el horario'+':  '+ error['response']['data'].split("-")[0]);
        }

        closePopup();
    };

    // Función para manejar la edición de un horario
    const handleEditHorario = async () => {
        const formattedHoraInicio = formatTimeForDatabase(formData.horaInicio);
        const formattedHoraFin = formatTimeForDatabase(formData.horaFin);

        const errors = {
            idHorario: !formData.idHorario,
            nombreHorario: !formData.nombreHorario,
            dias: !formData.dias,
            horaInicio: !formData.horaInicio,
            horaFin: !formData.horaFin
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }
        const horarioConId = profesores.find(horario => horario.id === formData.idHorario);
        console.log(horarioConId)
        try {
            const response = await axios.put(link + '/editSchedule', {
                idHorario: formData.idHorario,
                nombreHorario: formData.nombreHorario.trim(),
                dias: formData.dias,
                horaInicio: formattedHoraInicio,
                horaFin: formattedHoraFin

            });
            closePopup();
            alert('Horario actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el horario:', error);
            alert('Hubo un error al actualizar el horario'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la eliminación de un horario
    const handleDeleteHorario = async () => {
        const errors = {
            nombreHorario: !formData.nombreHorario,
            idHorario: !formData.idHorario,
            dias: !formData.dias,
            horaInicio: !formData.horaInicio,
            horaFin: !formData.horaFin
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, Seleccione un horario.');
            console.error('Por favor,  Seleccione un horario.');
            alert('Por favor,  Seleccione un horario.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.delete(link + '/deleteSchedule', {
                data: {
                    idHorario: formData.idHorario
                }
            });
            closePopup();
            alert('Horario eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el horario:', error);
            alert('Hubo un error al eliminar el horario'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la creación de un profesor
    const addTeacher = async () => {
        const errors = {
            nombreProfesor: !formData.nombreProfesor,
            correoProfesor: !formData.correoProfesor,
            identificacionProfesor: !formData.identificacionProfesor
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }

        try {

            const response = await axios.post(link + '/addTeacher', {
                nombre: formData.nombreProfesor.trim(),
                correo: formData.correoProfesor.trim(),
                identificacion: formData.identificacionProfesor.trim()
            });
            closePopup();
            alert('Profesor creado correctamente');
        } catch (error) {
            console.error('Error al crear el profesor:', error);
            alert('Hubo un error al crear el profesor'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la edición de un profesor
    const editTeacher = async () => {

        const profesorConId = profesores.find(profesor => profesor.Id === formData.idProfesor);
        //console.log('viejo: ',profesorConId.Email);
        //console.log('nuevo: ',formData.correoProfesor);
        
        const errors = {
            nombreProfesor: !formData.nombreProfesor,
            correoProfesor: !formData.correoProfesor,
            idProfesor: !formData.idProfesor,
            identificacionProfesor: !formData.identificacionProfesor
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }
        
        try {
            console.log(formData)
            console.log(profesores)
            const response = await axios.put(link + '/editTeacher', {
                
                nombre: formData.nombreProfesor,
                correo: formData.correoProfesor,
                correoviejo: profesorConId.Email,
                identificacion: formData.identificacionProfesor
            });
            closePopup();
            alert('Profesor actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el profesor:', error);
            alert('Hubo un error al actualizar el profesor:'+error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la eliminación de un profesor
    const deleteTeacher = async () => {
        const errors = {
            nombreProfesor: !formData.nombreProfesor,
            correoProfesor: !formData.correoProfesor,
            idProfesor: !formData.idProfesor
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, Seleccione un profesor.');
            console.error('Por favor,  Seleccione un profesor.');
            alert('Por favor,  Seleccione un profesor.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.delete(link + '/deleteTeacher', {
                data: {
                    correo: formData.correoProfesor
                }
            });
            closePopup();
            alert('Profesor eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el profesor:', error);
            alert('Hubo un error al eliminar el profesor'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la creación de un grupo
    const addGroup = async () => {
        const errors = {
            nombreGrupo: !formData.nombreGrupo,
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.post(link + '/addGroup', {
                nombre: formData.nombreGrupo.trim(),
            });

            closePopup();
            alert('Grupo creado correctamente');
        } catch (error) {
            console.error('Error al crear el grupo:', error);
            alert('Hubo un error al crear el grupo'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la edición de un grupo
    const editGroup = async () => {
        const errors = {
            nombreGrupo: !formData.nombreGrupo,
            idGrupo: !formData.idGrupo
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }
        const grupoConId = grupos.find(grupo => grupo.id === formData.idGrupo);
        console.log(grupoConId)
        try {
            const response = await axios.put(link + '/editGroup', {
                nombrenuevo: formData.nombreGrupo.trim(),
                nombreviejo: grupoConId.Name.trim(),
            });

            closePopup();
            alert('Grupo actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el grupo:', error);
            alert('Hubo un error al actualizar el grupo'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la eliminación de un grupo
    const deleteGroup = async () => {
        const errors = {
            nombreGrupo: !formData.nombreGrupo,
            idGrupo: !formData.idGrupo
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, seleccione un grupo.');
            console.error('Por favor, seleccione un grupo.');
            alert('Por favor, seleccione un grupo.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.delete(link + '/deleteGroup', {
                data: {
                    nombre: formData.nombreGrupo.trim()
                }
            });

            closePopup();
            alert('Grupo eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el grupo:', error);
            alert('Hubo un error al eliminar el grupo'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la creación de un curso
    const addCourse = async () => {
        const errors = {

        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.post(link + '/addCourse', {
                idUbicacion: formData.idLocacion,
                idProfesores: formData.idProfesor,
                idCursos: formData.idCatalogCourse,
                idHorario: formData.idHorario,
                idModalidad: formData.idModalidad,
                idGrupo: formData.idGrupo,
                fechaInicio: formData.fechaInicio,
                fechaFinal: formData.fechaFin,
                notes: '',

            });
            
            closePopup();
            alert('Curso creado correctamente');
        } catch (error) {
            console.error('Error al crear el curso:', error);
            alert('Hubo un error al crear el curso'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    // Función para manejar la fusión de cursos
    const handleFusionCourses = async () => {
        console.log(formData)
        const errors = {
            idCurso1: formData.idCurso1 === 0, // Verifica si idCurso1 es 0
            idCurso2: formData.idCurso2 === 0, // Verifica si idCurso2 es 0
            sameCourses: formData.idCurso1 === formData.idCurso2 // Verifica si los cursos son iguales
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            let errorMessage;
            if (errors.idCurso1 && errors.idCurso2) {
                errorMessage = 'Por favor, complete todos los campos correctamente.';
            } else if (errors.sameCourses) {
                errorMessage = 'Los cursos seleccionados no pueden ser iguales.';
            } else {
                errorMessage = 'Debe seleccionar ambos cursos.';
            }
            setError(errorMessage);
            console.error(errorMessage);
            alert(errorMessage);

            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.post(link + '/fusionCourses', {
                data: {
                    idCurso1: formData.idCurso1,
                    idCurso2: formData.idCurso2,
                    opcion: formData.fusionarCursos ? 1 : 0
                }
            });

            closePopup();
            alert('Cursos fusionados correctamente');
        } catch (error) {
            console.error('Error al fusionar los cursos:', error);
            alert('Hubo un error al fusionar los cursos'+':  '+ error['response']['data'].split("-")[0]);
        }
    };

    const renderContent = () => {
        switch (type) {
            case 'AgregarCurso':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={curso} alt="Imagen Agregar curso" />
                            </div>
                            <div className='columna columna-formulario'>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Agregar Curso</h1>
                                <body>Nombre del curso</body>
                                <div className='input-contenedor'>
                                    <select placeholder='Seleccione el grupo' onChange={handleSelectCatalogCourseChange}>
                                        <option value={0}>Seleccione un curso </option>
                                        {catalogCourses.map((catalog) => (
                                            <option key={catalog.IdCourses} value={catalog.IdCourses}>
                                                {catalog.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Grupo</body>
                                <div className='input-contenedor'>
                                    <select placeholder='Seleccione el grupo' onChange={handleSelectGroupChange}>
                                        <option value={0}>Seleccione un grupo </option>
                                        {grupos.map((grupo) => (
                                            <option key={grupo.id} value={grupo.id}>
                                                {grupo.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Profesor(a) responsable</body>
                                <div className='input-contenedor'>
                                <select placeholder='Seleccione el profesor(a)' onChange={handleSelectTeacherChange}>
                                        <option value={0}>Seleccione un profesor</option>
                                        {profesores.map((profesor) => (
                                            <option key={profesor.Id} value={profesor.Id}>
                                                {profesor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Periodo lectivo</body>
                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Fecha inicio</body>
                                        <input type='date' placeholder='Fecha inicio' name='fechaInicio' value={formData.fechaInicio} onChange={handleInputChange} />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Fecha fin</body>
                                        <input type='date' placeholder='Fecha fin' name='fechaFin' value={formData.fechaFin} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <body>Horario</body>
                                <div className='input-contenedor'>
                                    <select
                                        value={formData.idHorario} // Asegúrate de que el valor esté sincronizado con el estado
                                        onChange={handleSelectScheduleChange} // Manejador de eventos
                                    >
                                        <option value={0}>Seleccione un horario</option>
                                        {horarios.map(horario => (
                                            <option key={horario.Id} value={horario.Id}>
                                                {horario.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Sede</body>
                                        <select placeholder='Seleccione la locacion' onChange={handleSelectLocacionChange}>
                                            <option value={0}>Seleccione una locacion </option>
                                            {locaciones.map((locacion) => (
                                                <option key={locacion.Id} value={locacion.Id}>
                                                    {locacion.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Modalidad</body>
                                        <select placeholder='Seleccione la modalidad' onChange={handleSelectModalidadChange}>
                                            <option value={0}>Seleccione una modalidad </option>
                                            {modalidades.map((modalidad) => (
                                                <option key={modalidad.id} value={modalidad.id}>
                                                    {modalidad.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <body>Notas</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='Notas' />
                                </div>
                                <button className="btn_naranja" onClick={addCourse}> Agregar curso </button>
                            </div>
                        </div>
                    </div>
                );

            case 'GestionarProfesor':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={profesor} alt="Imagen Gestionar profesor" />
                            </div>
                            <div className='columna columna-formulario' style={{ width: '400px' }}>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Gestionar Profesor</h1>
                                <body>Seleccione el profesor(a) a gestionar</body>
                                <div className='input-contenedor'>
                                    <select placeholder='Seleccione el profesor(a)' onChange={handleSelectTeacherChange}>
                                        <option value={0}>Seleccione un profesor</option>
                                        {profesores.map((profesor) => (
                                            <option key={profesor.Id} value={profesor.Id}>
                                                {profesor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <body>Profesor(a)</body>
                                <div className='input-contenedor'>
                                    <input
                                        type='text'
                                        name='nombreProfesor'
                                        placeholder='Profesor o profesora'
                                        value={formData.nombreProfesor}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <body>Identificacion</body>
                                <div className='input-contenedor'>
                                    <input
                                        type='text'
                                        name='identificacionProfesor'
                                        placeholder='Identificacion'
                                        value={formData.identificacionProfesor}
                                        onChange={handleInputChange}
                                        //readOnly={formData.idProfesor}
                                    />
                                </div>
                                <body>Correo electrónico</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='usuario@dominiotec.com' name='correoProfesor' value={formData.correoProfesor} onChange={handleInputChange} />
                                </div>
                                {formData.idProfesor === 0 ? (
                                    <button className="btn_naranja" onClick={addTeacher}>Agregar profesor</button>
                                ) : (
                                    <>
                                        <button className="btn_azul" onClick={editTeacher}>Actualizar profesor</button>
                                        <button className="btn_azul" onClick={deleteTeacher}>Eliminar profesor</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'FusionarCursos':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={fusion} alt="Imagen Fusionar Cursos" />
                            </div>
                            <div className='columna columna-formulario' style={{ width: '400px' }}>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Fusionar Cursos</h1>
                                <body>Seleccione el primer curso</body>
                                <div className='input-contenedor'>
                                    <select onChange={(e) => handleSelectCourseChange(e, 1)}>
                                        <option value={0}>Seleccione un curso</option>
                                        {courses.map((curso) => (
                                            <option key={curso.Id} value={curso.Id}>
                                                {'ID' + curso.Id + ' ' + curso.Course + ' - ' + curso.Location}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Seleccione el segundo curso</body>
                                <div className='input-contenedor'>
                                    <select onChange={(e) => handleSelectCourseChange(e, 2)}>
                                        <option value={0}>Seleccione un curso</option>
                                        {courses.map((curso) => (
                                            <option key={curso.Id} value={curso.Id}>
                                                {'ID' + curso.Id + ' ' + curso.Course + ' - ' + curso.Location}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='checkbox-container'>
                                    <label><input className='' type='checkbox' onChange={handleCheckboxChange}></input> Deseo conservar el primer curso</label>
                                </div>
                                <button className="btn_naranja" onClick={handleFusionCourses}> Fusionar cursos </button>
                            </div>
                        </div>
                    </div>
                );

            case 'GestionarGrupo':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={grupo} alt="Imagen Gestionar Grupo" />
                            </div>
                            <div className='columna columna-formulario' style={{ width: '400px' }}>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Gestionar Grupo</h1>
                                <body>Seleccione el grupo a gestionar</body>
                                <div className='input-contenedor'>
                                    <select placeholder='Seleccione el grupo' onChange={handleSelectGroupChange}>
                                        <option value={0}>Seleccione o cree un grupo </option>
                                        {grupos.map((grupo) => (
                                            <option key={grupo.id} value={grupo.id}>
                                                {grupo.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Nombre del grupo</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='Grupo ##' name='nombreGrupo' value={formData.nombreGrupo} onChange={handleInputChange} />
                                </div>
                                {formData.idGrupo === 0 && (
                                    <>
                                        <button className="btn_naranja" onClick={addGroup}> Agregar grupo </button>
                                    </>
                                )}
                                {formData.idGrupo != 0 && (
                                    <>
                                        <button className="btn_azul" onClick={deleteGroup}> Eliminar grupo </button>
                                        <button className="btn_azul" onClick={editGroup}> Actualizar grupo </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'GestionarHorarios':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={imaHorario} alt="Imagen Agregar curso" />
                            </div>
                            <div className='columna columna-formulario'>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Gestionar Horario</h1>
                                <body>Seleccione el horario a gestionar</body>
                                <div className='input-contenedor'>
                                    <select
                                        value={formData.idHorario} // Asegúrate de que el valor esté sincronizado con el estado
                                        onChange={handleSelectScheduleChange} // Manejador de eventos
                                    >
                                        <option value={0}>Seleccione un horario</option>
                                        {horarios.map(horario => (
                                            <option key={horario.Id} value={horario.Id}>
                                                {horario.Name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <body>Nombre del horario</body>
                                <div className='input-contenedor'>
                                    <input
                                        type='text'
                                        name='nombreHorario'
                                        placeholder='Nombre del horario'
                                        value={formData.nombreHorario}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div style={{ textAlign: 'center', margin: '5px' }}>Días de clases</div>
                                <div className='checkbox-container'>

                                    <label><input type='checkbox' value='1' checked={formData.dias.includes('1')} onChange={handleCheckBoxChange} />Lunes</label>
                                    <label><input type='checkbox' value='2' checked={formData.dias.includes('2')} onChange={handleCheckBoxChange} />Martes</label>
                                    <label><input type='checkbox' value='3' checked={formData.dias.includes('3')} onChange={handleCheckBoxChange} />Miércoles</label>
                                    <label><input type='checkbox' value='4' checked={formData.dias.includes('4')} onChange={handleCheckBoxChange} />Jueves</label>
                                    <label><input type='checkbox' value='5' checked={formData.dias.includes('5')} onChange={handleCheckBoxChange} />Viernes</label>
                                    <label><input type='checkbox' value='6' checked={formData.dias.includes('6')} onChange={handleCheckBoxChange} />Sábado</label>
                                </div>

                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Hora inicio</body>
                                        <input
                                            type='time'
                                            name='horaInicio'
                                            placeholder='Hora inicio'
                                            onChange={handleInputChange}
                                            value={formData.horaInicio}
                                        />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Hora fin</body>
                                        <input
                                            type='time'
                                            name='horaFin'
                                            placeholder='Hora fin'
                                            onChange={handleInputChange}
                                            value={formData.horaFin}
                                        />
                                    </div>
                                </div>

                                {formData.idHorario === 0 || !formData.idHorario ? (
                                    <button className="btn_naranja" onClick={handleAddHorario}>Agregar horario</button>
                                ) : (
                                    <>
                                        <button className="btn_azul" onClick={handleEditHorario}>Actualizar horario</button>
                                        <button className="btn_azul" onClick={handleDeleteHorario}>Eliminar horario</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'GestionarEvento':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={imaEvento} alt="Imagen Evento" />
                            </div>
                            <div className='columna columna-formulario'>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Gestionar Evento</h1>

                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center' }}>Fecha inicio</body>
                                        <input
                                            type='date'
                                            name='diaInicio'
                                            placeholder='Fecha inicio'
                                            onChange={handleInputChange}
                                            value={formData.diaInicio}
                                        />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center' }}>Fecha fin</body>
                                        <input
                                            type='date'
                                            name='diaFin'
                                            placeholder='Hora fin'
                                            onChange={handleInputChange}
                                            value={formData.diaFin}
                                        />
                                    </div>
                                </div>

                                <body>Seleccione el evento a gestionar</body>
                                <div className='input-contenedor'>
                                    <select
                                        value={formData.idEvento} // Asegúrate de que el valor esté sincronizado con el estado
                                        onChange={handleSelectHolidayChange} // Manejador de eventos
                                    >
                                        <option value={0}>Seleccione un evento</option>
                                        {eventos.map(evento => (
                                            <option key={evento.Id} value={evento.Id}>
                                                {evento.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Nombre del evento</body>
                                <div className='input-contenedor'>
                                    <input
                                        type='text'
                                        name='nombreEvento'
                                        placeholder='Nombre del evento'
                                        value={formData.nombreEvento}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {formData.idEvento === 0 || !formData.idEvento ? (
                                    <button className="btn_naranja" onClick={handleAddHoliday}>Agregar evento</button>
                                ) : (
                                    <>
                                        <button className="btn_azul" onClick={handleEditHoliday}>Actualizar evento</button>
                                        <button className="btn_azul" onClick={handleDeleteHoliday}>Eliminar evento</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'CerrarSesion':
                return (
                    <div className='contenedor'>
                        <div className='contenedor-columnas'>
                            <div className='columna columna-imagen'>
                                <img src={cerrar} alt="Imagen" />
                            </div>
                            <div className='columna columna-formulario'>
                                <button className="close-popup" onClick={closePopup}>X</button>
                                <h1>Espera!</h1>
                                <body style={{ textAlign: 'center', fontSize: '15px', margin: '10px' }}>¿Estás seguro que deseas cerrar sesión?</body>
                                <button className="btn_naranja" onClick={() => navigate('/login')} >
                                    Cerrar sesión
                                </button>
                                <button className="btn_azul" onClick={closePopup}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Contenido no disponible</div>;
        }
    };

    return (
        <div className="popup-overlay">
            {renderContent()}
        </div>
    );
}

export default Popup;
