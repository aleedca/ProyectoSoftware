import React from "react";
import { FaUser, FaEdit, FaPlus, FaChalkboardTeacher, FaObjectGroup, FaLayerGroup, FaSignOutAlt, FaBars } from "react-icons/fa";
import '../Styles/Sidebar.css';
import './Popup.jsx'
import { useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, toggleSidebar, openPopup }) {

    const navigate = useNavigate();

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars size={20} />
            </button>
            <div className="user-info">
                {isOpen && (
                    <>
                        <FaUser size={40} />
                        <h2>Puesto: Profesor</h2>
                        <h3>Nombre Apellido</h3>
                    </>
                )}
            </div>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => navigate('/editar')}>
                            <FaEdit size={20} />
                            {isOpen && <span>Editar Perfil</span>}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => openPopup('AgregarCurso')}>
                            <FaPlus size={20} />
                            {isOpen && <span>Agregar Curso</span>}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => openPopup('GestionarProfesor')}>
                            <FaChalkboardTeacher size={20} />
                            {isOpen && <span>Gestionar Profesor</span>}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => openPopup('FusionarCursos')}>
                            <FaObjectGroup size={20} />
                            {isOpen && <span>Fusionar Cursos</span>}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => openPopup('GestionarGrupo')}>
                            <FaLayerGroup size={20} />
                            {isOpen && <span>Gestionar Grupo</span>}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => openPopup('CerrarSesion')}>
                            <FaSignOutAlt size={20} />
                            {isOpen && <span>Cerrar Sesión</span>}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
