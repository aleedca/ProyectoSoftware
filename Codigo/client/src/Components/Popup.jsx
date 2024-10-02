import React, { cloneElement } from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';
import Dropdown from './Dropdown.jsx'; // Asegúrate de importar el componente Dropdown
import curso from '../Assets/inicio.png';
import profesor from '../Assets/gestionar_profesor.png';
import fusion from '../Assets/fusionar_cursos.png';
import grupo from '../Assets/gestionar_grupo.png';
import cerrar from '../Assets/cerrar.png';

function Popup({ type, closePopup }) {
    const [profesores, setProfesores] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [catalogCourses, setCatalogCourses] = useState([]);
    const [locaciones, setLocaciones] = useState([]);
    const [modalidades, setModalidades] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [error, setError] = useState('');
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
        fechaFin: ''
    });

    const [isError, setIsError] = useState({
        nombreProfesor: false,
        correoProfesor: false
    });

    useEffect(() => {
        // Función para obtener la lista de profesores
        const fetchProfesores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getTeachers');
                setProfesores(response.data);
                console.log(response.data)
                console.log(profesores)
            } catch (error) {
                console.error('Error al obtener la lista de profesores:', error);
            }
        };

        fetchProfesores();
    }, []);

    useEffect(() => {
        // Función para obtener la lista de grupos
        const fetchGrupos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getGroups');
                setGrupos(response.data);
                console.log(response.data)
                console.log(grupos)
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
                const response = await axios.get('http://localhost:3001/getCatalogCourses');
                setCatalogCourses(response.data);
                console.log(response.data)
                console.log(catalogCourses)
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
                const response = await axios.get('http://localhost:3001/getLocations');
                setLocaciones(response.data);
                console.log(response.data)
                console.log(locaciones)
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
                const response = await axios.get('http://localhost:3001/getModalitys');
                setModalidades(response.data);
                console.log(response.data)
                console.log(modalidades)
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
                const response = await axios.get('http://localhost:3001/getSchedules');
                setHorarios(response.data);
                console.log(response.data)
                console.log(modalidades)
            } catch (error) {
                console.error('Error al obtener la lista de horarios:', error);
            }
        };

        fetchSchedules();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        console.log('FormData actualizado:', formData);

    }

    const handleSelectTeacher = (option) => {
        const selectedProfesor = profesores.find(profesor => profesor.Name === option);
        setFormData(prevFormData => ({
            ...prevFormData,
            nombreProfesor: selectedProfesor ? selectedProfesor.Name : '',
            correoProfesor: selectedProfesor ? selectedProfesor.email : '',
            idProfesor: selectedProfesor ? selectedProfesor.id : 0
        }));
    };

    const handleSelectTeacherChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            const profesorConId = profesores.find(profesor => profesor.id === e.target.value);
            console.log(profesorConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreProfesor']: profesorConId.Name,
                ['correoProfesor']: profesorConId.email,
                ['idProfesor']: profesorConId.id
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreProfesor']: '',
                ['correoProfesor']: '',
                ['idProfesor']: 0
            }));
        }

        console.log('Updated formData:', formData);

    };

    const handleSelectGroupChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            const grupoConId = grupos.find(grupo => grupo.id === e.target.value);
            console.log(grupoConId)
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

        console.log('Updated formData:', formData);

    };

    const handleSelectCatalogCourseChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            const catalogCourseConId = catalogCourses.find(catalog => catalog.Id === e.target.value);
            console.log(catalogCourseConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreCatalogCourse']: catalogCourseConId.Name,
                ['idCatalogCourse']: catalogCourseConId.Id
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreCatalogCourse']: '',
                ['idCatalogCourse']: 0
            }));
        }

        console.log('Updated formData:', formData);

    };

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

    const handleSelectModalidadChange = (e) => {
        const { key, value } = e.target;
        console.log(e.target)
        if (e.target.value != 0) {
            console.log(e.target.value)
            console.log(modalidades)
            const modalidadConId = modalidades.find(modalidad => modalidad.id === e.target.value);
            console.log(modalidadConId)
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

        console.log('Updated formData:', formData);

    };
    
    // Función para manejar la selección del horario
    const handleSelectScheduleChange = (e) => {
        const selectedId = e.target.value;
        const selectedSchedule = horarios.find(horario => horario.Id === selectedId);

        const dicDias = {
            'Domingo':0,
            'Lunes': 1,
            'Martes': 2,
            'Miércoles':3,
            'Jueves':4,
            'Viernes':5,
            'Sabado':6
        }
        
    
        // Actualiza el estado de formData
        if (selectedSchedule) {
            var listadias = []
            for (var dia in selectedSchedule['Days'].split(",")){
                
                listadias.push(dicDias[selectedSchedule['Days'].split(",")[dia]].toString())
            }
            console.log(listadias)
            setFormData(prevFormData => {
                // Actualiza el formData con los datos del horario seleccionado
                const updatedFormData = {
                    ...prevFormData,
                    nombreHorario: selectedSchedule.Name,
                    idHorario: selectedSchedule.Id,
                    dias: listadias,
                    horaInicio: selectedSchedule.StartTime.split('T')[1].split(':')[0] + ':' + selectedSchedule.StartTime.split('T')[1].split(':')[1], // Extrae solo la hora
                    horaFin: selectedSchedule.StartTime.split('T')[1].split(':')[0] + ':' + selectedSchedule.StartTime.split('T')[1].split(':')[1]    // Extrae solo la hora
                };
    
                // Para mantener el comportamiento similar a los checkboxes, puedes usar un efecto
                // para actualizar inmediatamente el estado o trabajar con el estado más reciente
    
                console.log('FormData actualizado:', updatedFormData); // Para verificar los datos actualizados
    
                return updatedFormData;
            });
        } else {
            // Limpiar el estado si no se selecciona un horario válido
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
    
    
    const handleCheckBoxChange = (e) => {
        const { value } = e.target;
        
        // Calcula la nueva lista de días seleccionados
        const newSelectedDays = e.target.checked
            ? [...selectedDays, value]
            : selectedDays.filter((day) => day !== value);
    
        // Actualiza el estado de selectedDays y formData juntos usando newSelectedDays
        setSelectedDays(newSelectedDays);
        
        // Usa el valor actualizado de newSelectedDays para actualizar formData
        setFormData((prevFormData) => ({
            ...prevFormData,
            dias: newSelectedDays,
        }));
        
        console.log('Updated formData:', {
            ...formData,
            dias: newSelectedDays,
        });
        
    };
    
    

    const formatTimeForDatabase = (time) => {
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}:00`;
    };

    const handleAddHorario = async () => {
        // Convierte los días seleccionados a un string separado por comas
        const formattedHoraInicio = formatTimeForDatabase(formData.horaInicio);
        const formattedHoraFin = formatTimeForDatabase(formData.horaFin);
    
       
        try {
            const response = await axios.post('http://localhost:3001/addSchedule', {
                nombreHorario: formData.nombreHorario,
                dias: formData.dias,
                horaInicio: formattedHoraInicio,
                horaFin: formattedHoraFin
            });
            console.log('Horario creado:', response.data);
            closePopup();
            alert('Horario creado correctamente');
        } catch (error) {
            console.error('Error al crear el horario:', error);
        }
    
        // Cierra el popup
        closePopup();
    };

    const handleEditHorario = async () => {
        // Convierte los días seleccionados a un string separado por comas
        const formattedHoraInicio = formatTimeForDatabase(formData.horaInicio);
        const formattedHoraFin = formatTimeForDatabase(formData.horaFin);

        const errors = {
            nombreHorario: !formData.nombreHorario,
            dias: !formData.dias,
            idHorario: !formData.idHorario,
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
            const response = await axios.put('http://localhost:3001/editSchedule', {
                idHorario: formData.idHorario,
                nombreHorario: formData.nombreHorario,
                dias: formData.dias,
                horaInicio: formattedHoraInicio,
                horaFin: formattedHoraFin

            });
            console.log('Horario actualizado:', response.data);
            closePopup();
            alert('Horario actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el horario:', error);
        }
    };

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
            const response = await axios.delete('http://localhost:3001/deleteSchedule', {
                data: {
                    idHorario: formData.idHorario
                }
            });
            console.log('Horario Eliminado:', response.data);
            closePopup();
            alert('Horario eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el horario:', error);
        }
    };

    const addTeacher = async () => {
        const errors = {
            nombreProfesor: !formData.nombreProfesor,
            correoProfesor: !formData.correoProfesor,
            identificacionProfesor: !formData.identificacionProfesor
        };
        console.log(formData.identificacionProfesor)

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, complete todos los campos correctamente.');
            console.error('Por favor, complete todos los campos correctamente.');
            alert('Por favor, complete todos los campos correctamente.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            
            const response = await axios.post('http://localhost:3001/addTeacher', {
                nombre: formData.nombreProfesor,
                correo: formData.correoProfesor,
                identificacion: formData.identificacionProfesor
            });
            console.log('Profesor creado:', response.data);
            closePopup();
            alert('Profesor creado correctamente');
        } catch (error) {
            console.error('Error al crear el profesor:', error);
        }
    };

    const editTeacher = async () => {
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
        const profesorConId = profesores.find(profesor => profesor.id === formData.idProfesor);
        console.log(profesorConId)
        try {
            const response = await axios.put('http://localhost:3001/editTeacher', {


                nombre: formData.nombreProfesor,
                correo: formData.correoProfesor,
                correoviejo: profesorConId.email,
                identificacion: formData.identificacion
            });
            console.log('Profesor actualizado:', response.data);
            closePopup();
            alert('Profesor actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el profesor:', error);
        }
    };

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
            const response = await axios.delete('http://localhost:3001/deleteTeacher', {


                data: {
                    correo: formData.correoProfesor
                }
            });
            console.log('Profesor Eliminado:', response.data);
            closePopup();
            alert('Profesor eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el profesor:', error);
        }
    };


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
            const response = await axios.post('http://localhost:3001/addGroup', {
                nombre: formData.nombreGrupo,

            });
            console.log('Grupo creado:', response.data);
            closePopup();
            alert('Grupo creado correctamente');
        } catch (error) {
            console.error('Error al crear el grupo:', error);
        }
    };

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
            const response = await axios.post('http://localhost:3001/addCourse', {
               
                
                idUbicacion:formData.idLocacion,
                idProfesores:formData.idProfesor,
                idCursos:formData.idCatalogCourse,
                idHorario:formData.idHorario,
                idModalidad:formData.idModalidad,
                idGrupo:formData.idGrupo,
                fechaInicio: formData.fechaInicio,
                fechaFinal:formData.fechaFin,
                notes: '',

            });
            console.log('Curso creado:', response.data);
            closePopup();
            alert('Curso creado correctamente');
        } catch (error) {
            console.error('Error al crear el Curso:', error);
        }
    };


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
            const response = await axios.put('http://localhost:3001/editGroup', {


                nombrenuevo: formData.nombreGrupo,

                nombreviejo: grupoConId.Name,

            });
            console.log('Grupo actualizado:', response.data);
            closePopup();
            alert('Grupo actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el Grupo:', error);
        }
    };

    const deleteGroup = async () => {
        const errors = {
            nombreGrupo: !formData.nombreGrupo,

            idGrupo: !formData.idGrupo
        };

        setIsError(errors);

        if (Object.values(errors).includes(true)) {
            setError('Por favor, Seleccione un grupo.');
            console.error('Por favor,  Seleccione un grupo.');
            alert('Por favor,  Seleccione un grupo.');
            return false; // Detiene la ejecución si hay errores
        }

        try {
            const response = await axios.delete('http://localhost:3001/deleteGroup', {
                data: {
                    nombre: formData.nombreGrupo
                }
            });
            console.log('grupo Eliminado:', response.data);
            closePopup();
            alert('grupo eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el grupo:', error);
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
                                            <option key={catalog.Id} value={catalog.Id}>
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
                                    <select placeholder='Seleccione el profesor' onChange={handleSelectTeacherChange}>
                                        <option value={0}>Seleccione un profesor </option>
                                        {profesores.map((profesor) => (
                                            <option key={profesor.email} value={profesor.id}>
                                                {profesor.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <body>Periodo lectivo</body>
                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Fecha inicio</body>
                                        <input type='date' placeholder='Fecha inicio' name='fechaInicio' value={formData.fechaInicio} onChange={handleInputChange}/>
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
                          <body>Seleccione el profesor a gestionar</body>
                          <div className='input-contenedor'>
                            <Dropdown type='dropdown'
                              options={profesores.map(profesor => profesor.Name)}
                              onSelect={handleSelectTeacher}
                            />
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
                            />
                          </div>
                          <body>Correo electrónico</body>
                          <div className='input-contenedor'>
                            <input
                              type='text'
                              name='correoProfesor'
                              placeholder='usuario@dominiotec.com'
                              value={formData.correoProfesor}
                              onChange={handleInputChange}
                            />
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
                                <body>Seleccione el curso a fusionar</body>
                                <div className='input-contenedor'>
                                    <input type='select' placeholder='Seleccione curso' />
                                </div>
                                <body>Sede del curso</body>
                                <div className='input-contenedor'>
                                    <input type='select' placeholder='Seleccione Sede' />
                                </div>
                                <body>Grupos a fusionar</body>
                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Grupo 1</body>
                                        <input type='select' placeholder='Seleccione 1er grupo' />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Grupo 2</body>
                                        <input type='select' placeholder='Seleccione 2do grupo' />
                                    </div>
                                </div>
                                <button className="btn_naranja" onClick={closePopup}> Fusionar cursos </button>
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
                                    <img src={curso} alt="Imagen Agregar curso" />
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
                                    
                                        <label><input type='checkbox' value='1'  checked={formData.dias.includes('1')} onChange={handleCheckBoxChange} />Lunes</label>
                                        <label><input type='checkbox' value='2'  checked={formData.dias.includes('2')}  onChange={handleCheckBoxChange} />Martes</label>
                                        <label><input type='checkbox' value='3'  checked={formData.dias.includes('3')}  onChange={handleCheckBoxChange} />Miércoles</label>
                                        <label><input type='checkbox' value='4'  checked={formData.dias.includes('4')}  onChange={handleCheckBoxChange} />Jueves</label>
                                        <label><input type='checkbox' value='5'  checked={formData.dias.includes('5')}  onChange={handleCheckBoxChange} />Viernes</label>
                                        <label><input type='checkbox' value='6'  checked={formData.dias.includes('6')}  onChange={handleCheckBoxChange} />Sábado</label>
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
                                <button className="btn_naranja" onClick={closePopup}>
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
