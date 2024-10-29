
//import './FormLogin.css';
import './App.css'
import { useEffect, useState ,useContext }from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaIdCard, FaUnlock} from 'react-icons/fa';
import imagen from './Assets/changepassword.png';
import { UserContext } from './UserContext'; // Asegúrate de importar UserContext

function CrearNuevaContrasena() {
  const { link } = useContext(UserContext); 
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [confirmContrasenna, setConfirmContrasenna] = useState('');
  

  

  return (
    <div className='fondo-cambiarContraseña'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Crear nueva contraseña</h1>
              <body>Código de verificación </body>
              <div className="input-contenedor">
                  <input className='text-izquierda' type="text" placeholder="# # # #" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
              </div>
              <body>Contraseña </body>
              <div className="input-contenedor">
                  <input className='text-izquierda' type="text" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
              </div>
          
              <body>Digite su correo </body>
              <div className="input-contenedor">
                  <input className='text-izquierda' type="text" placeholder="example@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>

              <body>Confirmar contraseña </body>
              <div className="input-contenedor">
                  <input className='text-izquierda' type="text" placeholder="Ingrese la contraseña" value={confirmContrasenna} onChange={(e) => setConfirmContrasenna(e.target.value)} />
              </div>
              
              <button style={{ marginTop: '20px' }} className="btn_naranja">Cambiar contraseña</button>
              

              
          </div>

          {/* Columna para la imagen */}
          <div className='columna columna-imagen'>
            <img style={{ marginTop: '40px' }} src={imagen} alt='Imagen Login' />
          </div>

        </div>
      </div>
    </div>
  );
  
}

export default CrearNuevaContrasena;
