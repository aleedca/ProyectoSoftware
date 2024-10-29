import React, { useContext } from "react"; // Asegúrate de importar useContext
import { FaUser, FaEdit, FaPlus, FaChalkboardTeacher, FaObjectGroup, FaTasks,
        FaSignOutAlt, FaBars, FaClipboardList, FaCalendarCheck, FaPeopleArrows } from "react-icons/fa";
import { LuCombine } from "react-icons/lu";
import '../Styles/Sidebar.css';
import './Popup.jsx';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Asegúrate de importar UserContext

function Sidebar({ isOpen, toggleSidebar, openPopup }) {

    const navigate = useNavigate();
    const { fullName,link } = useContext(UserContext); // Usar el contexto

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
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
                            <br />
                            {/* Muestra el nombre completo correctamente */}
                            <span style={{ color: '#FFFFFF' }}>{fullName}</span>
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
                    <ul style={{ height: '100%', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <li style={{ backgroundColor: 'transparent' }}>
                            <button className="buttons" style={{ alignItems: 'center' }} onClick={() => navigate('/editar')}>
                                <FaEdit style={{ color: "white" }} size={20} />
                                {isOpen && <span>Editar Perfil</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px', marginTop: '40%' }}>
                            <button className="buttons" onClick={() => openPopup('AgregarCurso')}>
                                <FaPlus size={20} />
                                {isOpen && <span>Agregar Curso</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
                            <button className="buttons" onClick={() => openPopup('GestionarProfesor')}>
                                <FaChalkboardTeacher size={20} />
                                {isOpen && <span>Gestionar Profesor</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
                            <button className="buttons" onClick={() => openPopup('FusionarCursos')}>
                                <LuCombine size={20} />
                                {isOpen && <span>Fusionar Cursos</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
                            <button className="buttons" onClick={() => openPopup('GestionarGrupo')}>
                                <FaPeopleArrows size={20} />
                                {isOpen && <span>Gestionar Grupo</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
                            <button className="buttons" onClick={() => openPopup('GestionarHorarios')}>
                                <FaTasks size={20} />
                                {isOpen && <span>Gestionar Horarios</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
                            <button className="buttons" onClick={() => openPopup('GestionarEvento')}>
                                <FaCalendarCheck size={20} />
                                {isOpen && <span>Gestionar Evento</span>}
                            </button>
                        </li>
                        <li style={{ backgroundColor: 'transparent', height: '48px' }}>
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
