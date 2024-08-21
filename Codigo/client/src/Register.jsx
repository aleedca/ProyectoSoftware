
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaIdCard, FaUnlock} from 'react-icons/fa';
import imagen from './Assets/register.png';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [confirmContrasenna, setConfirmContrasenna] = useState('');
  const [error, setError] = useState('');
  const [listOfPosts, setListOfPosts] = useState([]);

  const [isError, setIsError] = useState({
    nombre: false,
    primerApellido: false,
    segundoApellido: false,
    correo: false,
    contrasenna: false,
    confirmContrasenna: false
  });

  function sendData(){
    const errors = {
      nombre: !nombre,
      primerApellido: !primerApellido,
      segundoApellido: !segundoApellido,
      correo: !correo,
      contrasenna: !contrasenna,
      confirmContrasenna: !confirmContrasenna || contrasenna !== confirmContrasenna
    };

    setIsError(errors);

    if (Object.values(errors).includes(true)) {
      setError('Por favor, complete todos los campos correctamente.');
      console.error('Por favor, complete todos los campos correctamente.');
      return; // Detiene la ejecución si hay errores
    }

    axios.post("http://localhost:3001/addUser", {
      nombre,
      primerApellido,
      segundoApellido,
      correo,
      contrasenna
    })
      .then((response) => {
        console.log('Post creado:', response.data);
        navigate('/')
        // Puedes actualizar la lista de posts aquí si es necesario
        
      })
      .catch((error) => {
        console.error('Error al crear el post:', error['response']['data']);
        setError(error['response']['data']);
      });

  }

  return (
    <div className='fondo-crearCuenta'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Crear cuenta</h1>
              
            
              <body>Nombre</body>
              <div className={`input-contenedor ${isError.nombre ? 'error' : ''}`}>
                  <FaUser  className="icono" />
                  <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>

              <body>Primer apellido</body>
              <div className={`input-contenedor ${isError.primerApellido ? 'error' : ''}`}>
                  <FaIdCard  className="icono" />
                  <input type="text" placeholder="Primer apellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
              </div>

              <body>Segundo apellido</body>
              <div className={`input-contenedor ${isError.segundoApellido ? 'error' : ''}`}>
                  <FaIdCard  className="icono" />
                  <input type="text" placeholder="Segundo apellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
              </div>

              <body>Correo</body>
              <div className={`input-contenedor ${isError.correo ? 'error' : ''}`}>
                  <FaEnvelope  className="icono" />
                  <input type="text" placeholder="ejemplo@dominio.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>

              <body>Contraseña</body>
              <div className={`input-contenedor ${isError.contrasenna ? 'error' : ''}`}>
                  <FaLock  className="icono" />
                  <input type="Password" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
              </div>

              <body>Confirmar contraseña</body>
              <div className={`input-contenedor ${isError.confirmContrasenna ? 'error' : ''}`}>
                  <FaUnlock  className="icono" />
                  <input type="Password" placeholder="Confirme la contraseña" value={confirmContrasenna} onChange={(e) => setConfirmContrasenna(e.target.value)} />
              </div>
              {error && <div className="error-message">{error}</div>}
          </div>

          {/* Columna para la imagen */}
          <div className='columna columna-imagen'>
            <img style={{ marginTop: '40px' }} src={imagen} alt='Imagen Login' />
            <button  type="submit" style={{ marginTop: '20px' }} className="btn_naranja" onClick={sendData}>Registrar cuenta</button>
            <body> ¿Ya tienes cuenta? <Link to="/" style={{color: '#018ABD', fontWeight: 'bold', marginLeft: '80px'}}>Iniciar sesión</Link></body>
          </div>

        </div>
      </div>
    </div>
  );
  
}

export default Register;
