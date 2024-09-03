import React from "react";
import { FaUser, FaEdit, FaPlus, FaChalkboardTeacher, FaObjectGroup, FaLayerGroup, FaSignOutAlt, FaBars } from "react-icons/fa";
import '../Styles/Sidebar.css';
import './Popup.jsx'
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar, openPopup }) {

    const navigate = useNavigate();

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}  >
            {!isOpen && (
                <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars size={20} />
                </button>
            )}
            {isOpen && (
                <div className="user-info">
                    <div className="row">
                        <div className="col"><FaUser size={40} /></div>
                        <div className="col">
                            <span style={{color: 'rgba(255, 255, 255, 0.32)'}}>Puesto:Profesor</span>
                            <br/>
                            <span style={{color: '#FFFFFF'}}>NombreApellido</span>
                        </div>
                        <div className="col">
                            <button className="toggle-button" onClick={toggleSidebar}>
                                <FaBars size={20} />
                            </button>
                        </div>
                        
                        
                    </div>
                
                </div>
            )}
            {isOpen && (
            <nav>
                <ul>
                    <li style={{backgroundColor: 'transparent'}}>
                        
                        <button className="buttons" style={{alignItems: 'center'}} onClick={() => navigate('/editar')} >
                            {/*<FaEdit  style={{color:"white"}} size={20} />*/}
                            {isOpen && <span >Editar Perfil</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px',marginTop: '70%'}}> 
                        <button className="buttons-orange" onClick={() => openPopup('AgregarCurso')}>
                            <FaPlus size={20} />
                            {isOpen && <span>Agregar Curso</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px'}}>
                        <button  className="buttons" onClick={() => openPopup('GestionarProfesor')}>
                            <FaChalkboardTeacher size={20} />
                            {isOpen && <span>Gestionar Profesor</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px'}}>
                        <button className="buttons" onClick={() => openPopup('FusionarCursos')}>
                            <FaObjectGroup size={20} />
                            {isOpen && <span>Fusionar Cursos</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px'}}>
                        <button className="buttons" onClick={() => openPopup('GestionarGrupo')}>
                            <FaLayerGroup size={20} />
                            {isOpen && <span>Gestionar Grupo</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px'}}>
                        <button className="buttons" onClick={() => openPopup('GestionarHorarios')}>
                            <FaLayerGroup size={20} />
                            {isOpen && <span>Gestionar Horarios</span>}
                        </button>
                    </li>
                    <li style={{backgroundColor: 'transparent',height: '48px'}}>
                        <button className="buttons" onClick={() => openPopup('CerrarSesion')}>
                            <FaSignOutAlt size={20} />
                            {isOpen && <span>Cerrar Sesión</span>}
                        </button>
                    </li>
                </ul>
            </nav>
            )}
        </div>
    );
}

export default Sidebar;
