
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import imagen from './Assets/login.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState('');

  const [listOfPosts, setListOfPosts] = useState([]);

  const [isError, setIsError] = useState({
    contrasenna: false,
    correo: false
  });

  function sendData() {
    const errors = {
      contrasenna: !contrasenna,
      correo: !correo
    };

    setIsError(errors);

    if (Object.values(errors).includes(true)) {
      setError('Por favor, complete todos los campos correctamente.');
      console.error('Por favor, complete todos los campos correctamente.');
      return; // Detiene la ejecución si hay errores
    }

    axios.get("http://localhost:3001/getUser", {
      params: {
        contrasenna,
        correo
      }
    })
      .then((response) => {
        console.log('Usuario autenticado:', response.data);
        alert('Usuario encontrado');
        navigate('/')

      })
      .catch((error) => {
        console.error('Error al autenticar el usuario:', error.response.data);
        alert('Usuario no encontrado')
        setError(error.response.data);
      });
  }

  return (
    <div className='fondo-login'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para la imagen */}
          <div className='columna columna-imagen'>
            <img src={imagen} alt='Imagen Login' />
          </div>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Iniciar sesión</h1>


            <body style={{ marginTop: '20px' }}>Correo electrónico</body>
            <div className={`input-contenedor ${isError.correo ? 'error' : ''}`}>
              <FaEnvelope className="icono" />
              <input type="text" placeholder="example@domain.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>

            <body style={{ marginTop: '20px' }}>Contraseña</body>
            <div className={`input-contenedor ${isError.contrasenna ? 'error' : ''}`}>
              <FaLock className="icono" />
              <input type="Password" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
            </div>
            <div onClick={() => navigate('/recuperarcontrasena')} style={{ cursor: 'pointer', textAlign: 'start', color: 'black' }}>
              ¿Olvidó la contraseña?
            </div>

            <button style={{ marginTop: '20px' }} className="btn_naranja" onClick={sendData}>Iniciar sesión</button>
            <body> ¿No tienes una cuenta? <Link to="/registrarse" style={{ color: '#018ABD', fontWeight: 'bold', marginLeft: '80px' }}>Registrarse</Link></body>

          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
