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
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        nombreProfesor: '',
        correoProfesor: ''
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
            } catch (error) {
                console.error('Error al obtener la lista de profesores:', error);
            }
        };

        fetchProfesores();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
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
                                    <select placeholder='Seleccione el profesor'>
                                        <option value="">Seleccione un profesor</option>
                                        {profesores.map((profesor) => (
                                            <option key={profesor.id} value={profesor.id}>
                                                {profesor.nombre}
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
                                <button className="btn_naranja" onClick={addTeacher}> Agregar profesor </button>
                                <button className="btn_azul" onClick={closePopup}> Actualizar profesor </button>
                                <button className="btn_azul" onClick={closePopup}> Eliminar profesor </button>

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
                                    <input type='select' placeholder='Seleccione grupo' />
                                </div>
                                <body>Nombre del grupo</body>
                                <div className='input-contenedor'>
                                    <input type='text' placeholder='Grupo ##' />
                                </div>

                                <button className="btn_naranja" onClick={closePopup}> Agregar grupo </button>
                                <button className="btn_azul" onClick={closePopup}> Eliminar grupo </button>
                                <button className="btn_azul" onClick={closePopup}> Actualizar grupo </button>
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
