
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaIdCard, FaUnlock} from 'react-icons/fa';
import imagen from './Assets/register.png';

function Edit() {

  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [confirmContrasenna, setConfirmContrasenna] = useState('');
  const [error, setError] = useState('');

  return (
    <div className='fondo-crearCuenta'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Editar cuenta</h1>
            
              <body>Nombre</body>
              <div className="input-contenedor">
                  <FaUser  className="icono" />
                  <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>

              <body>Primer apellido</body>
              <div className="input-contenedor">
                  <FaIdCard  className="icono" />
                  <input type="text" placeholder="Primer apellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
              </div>

              <body>Segundo apellido</body>
              <div className="input-contenedor">
                  <FaIdCard  className="icono" />
                  <input type="text" placeholder="Segundo apellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
              </div>

              <body>Correo</body>
              <div className="input-contenedor">
                  <FaEnvelope  className="icono" />
                  <input type="text" placeholder="ejemplo@dominio.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>

              <body>Contraseña</body>
              <div className="input-contenedor">
                  <FaLock  className="icono" />
                  <input type="Password" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
              </div>

              <body>Confirmar contraseña</body>
              <div className="input-contenedor">
                  <FaUnlock  className="icono" />
                  <input type="Password" placeholder="Confirme la contraseña" value={confirmContrasenna} onChange={(e) => setConfirmContrasenna(e.target.value)} />
              </div>
          </div>

          {/* Columna para la imagen */}
          <div className='columna columna-imagen'>
            <img style={{ marginTop: '40px' }} src={imagen} alt='Imagen Login' />
            <button style={{ marginTop: '20px' }} className="btn_naranja">Actualizar cuenta</button>
            <body> ¿Desea eliminar la cuenta? <Link to="" style={{color: '#018ABD', fontWeight: 'bold', marginLeft: '80px'}}>Eliminar</Link></body>
          </div>

        </div>
      </div>
    </div>
  );
  
}

export default Edit;
