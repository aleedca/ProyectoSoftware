
//import './FormLogin.css';
import './App.css'
import { useEffect, useState ,  useContext } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaIdCard, FaUnlock} from 'react-icons/fa';
import imagen from './Assets/changepassword.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Asegúrate de importar UserContext

function RecuperarContrasena() {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const { link } = useContext(UserContext); 

  return (
    <div className='fondo-cambiarContraseña'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Recuperar <br/>contraseña</h1>
            
              <body>Digite su correo </body>
              <div className="input-contenedor">
                  
                  <input className='text-izquierda' type="text" placeholder="example@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              
              <button style={{ marginTop: '20px' }} className="btn_naranja">Enviar código</button>
              <button style={{ marginTop: '20px' }} className="btn_azul" onClick={() => navigate('/crearnuevacontrasena')}>Siguiente paso</button>
            

              
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

export default RecuperarContrasena;
