import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css';
import curso from '../Assets/inicio.png';
import profesor from '../Assets/gestionar_profesor.png';
import fusion from '../Assets/fusionar_cursos.png';
import grupo from '../Assets/gestionar_grupo.png';
import cerrar from '../Assets/cerrar.png';


function Popup({ type, closePopup }) {
    const [profesores, setProfesores] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nombreProfesor: '',
        correoProfesor: '',
        idProfesor: 0 ,

        idGrupo: 0,
        nombreGrupo: ''
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

    }


    const handleSelectTeacherChange = (e) => {
        const {key, value } = e.target;
        console.log(e.target)
        if(e.target.value != 0){
            const profesorConId = profesores.find(profesor => profesor.id === e.target.value);
            console.log(profesorConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreProfesor']: profesorConId.Name,
                ['correoProfesor']: profesorConId.email,
                ['idProfesor']: profesorConId.id
            }));
        }else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreProfesor']: '',
                ['correoProfesor']: '',
                ['idProfesor']: 0
            }));
        }
       
        console.log('Updated formData:', formData);

    };

    const handleSelectGruopChange = (e) => {
        const {key, value } = e.target;
        console.log(e.target)
        if(e.target.value != 0){
            const grupoConId = grupos.find(grupo => grupo.id === e.target.value);
            console.log(grupoConId)
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreGrupo']: grupoConId.Name,
                ['idGrupo']: grupoConId.id
            }));
        }else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                ['nombreGrupo']: '',
                ['idGrupo']: 0
            }));
        }
       
        console.log('Updated formData:', formData);

    };

    const addTeacher = async () => {
        const errors = {
            nombreProfesor: !formData.nombreProfesor,
            correoProfesor: !formData.correoProfesor
        };

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
                correo: formData.correoProfesor
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
            idProfesor: !formData.idProfesor
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

    const deleteGruop = async () => {
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
                                    <input type='text' placeholder='Nombre del curso' />
                                </div>
                                <body>Grupo</body>
                                <div className='input-contenedor'>
                                    <input type='select' placeholder='Grupo' />
                                </div>
                                <body>Profesor(a) responsable</body>
                                <div className='input-contenedor'>
                                    <input type='select' placeholder='Profesor o profesora' />
                                </div>
                                <body>Periodo lectivo</body>
                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Fecha inicio</body>
                                        <input type='date' placeholder='Fecha inicio' />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Fecha fin</body>
                                        <input type='date' placeholder='Fecha fin' />
                                    </div>
                                </div>
                                <body>Horario</body>
                                <div className='input-contenedor'>
                                    <input type='select' placeholder='Horario' />
                                </div>

                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Sede</body>
                                        <input type='select' placeholder='Seleccionar Sede' />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Modalidad</body>
                                        <input type='text' placeholder='Seleccione la modalidad' />
                                    </div>
                                </div>
                                <body>Notas</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='Notas' />
                                </div>
                                <button className="btn_naranja" onClick={closePopup}> Agregar curso </button>
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
                                    <select placeholder='Seleccione el profesor' onChange={handleSelectTeacherChange}>
                                        <option value={0}>Seleccione o cree un profesor </option>
                                        {profesores.map((profesor) => (
                                            <option key={profesor.email} value={profesor.id}>
                                                {profesor.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <body>Profesor(a)</body>
                                <div className='input-contenedor'>
                                    <input type='text' name='nombreProfesor' placeholder='Profesor o profesora' value={formData.nombreProfesor} onChange={handleInputChange} />
                                    </div>
                                <body>Correo eléctronico</body>
                                <div className='input-contenedor'>
                                    <input type='text' name='correoProfesor' placeholder='usuario@dominiotec.com' value={formData.correoProfesor} onChange={handleInputChange} />
                                </div>
                                
                                {formData.idProfesor === 0 && (
                                    <>
                                    <button className="btn_naranja" onClick={addTeacher}> Agregar profesor </button>
                                    </>
                                )}
                                {formData.idProfesor != 0 && (
                                    <>
                                    <button className="btn_azul" onClick={editTeacher}> Actualizar profesor </button>
                                    <button className="btn_azul" onClick={deleteTeacher}> Eliminar profesor </button>
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
                                    <select placeholder='Seleccione el grupo' onChange={handleSelectGruopChange}>
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
                                    <input type='text' placeholder='Grupo ##' name='nombreGrupo' value={formData.nombreGrupo} onChange={handleInputChange}/>
                                </div>
                                {formData.idGrupo === 0 && (
                                    <>
                                    <button className="btn_naranja" onClick={addGroup}> Agregar grupo </button>
                                    </>
                                )}
                                {formData.idGrupo != 0 && (
                                    <>
                                    <button className="btn_azul" onClick={deleteGruop}> Eliminar grupo </button>
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
                                <h1>Agregar Horario</h1>
                                <body>Nombre del horario</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='Nombre del horario' />
                                </div>


                                <body style={{ textAlign: 'center', margin: '5px' }}>Días de clases</body>
                                <div className='checkbox-container'>
                                    <label><input type='checkbox' value='Jueves' />Lunes</label>
                                    <label><input type='checkbox' value='Jueves' />Martes</label>
                                    <label><input type='checkbox' value='Jueves' />Miércoles</label>
                                    <label><input type='checkbox' value='Jueves' />Jueves</label>
                                    <label><input type='checkbox' value='Jueves' />Viernes</label>
                                    <label><input type='checkbox' value='Jueves' />Sábado</label>
                                </div>
                                <div className='fila-juntas'>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Hora inicio</body>
                                        <input type='time' placeholder='Hora inicio' />
                                    </div>
                                    <div className='input-contenedor'>
                                        <body style={{ textAlign: 'center', marginTop: '10px' }}>Hora fin</body>
                                        <input type='time' placeholder='Hora fin' />
                                    </div>
                                </div>

                                <button className="btn_naranja" onClick={closePopup}> Agregar horario </button>
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
