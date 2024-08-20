
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import imagen from './Assets/login.png';

function Login() {

  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState('');

  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/basic").then((response) => {
      setListOfPosts(response.data);
      console.log(response.data)
    });
  }, []);

  /*

  return (
    <div className="Login">
      {listOfPosts.map((value, key) => {
        return (
          <div className="container">
            <div className="form_area">
              <p className="title">SIGN UP</p>
              <form action="">
                <div className="form_group">
                  <label className="sub_title" htmlFor="name">Name</label>
                  <input placeholder="Enter your full name" className="form_style" type="text" />
                </div>
                <div className="form_group">
                  <label className="sub_title" htmlFor="correo">correo</label>
                  <input placeholder="Enter your correo" id="correo" className="form_style" type="correo" />
                </div>
                <div className="form_group">
                  <label className="sub_title" htmlFor="contrasenna">contrasenna</label>
                  <input placeholder="Enter your contrasenna" id="contrasenna" className="form_style" type="contrasenna" />
                </div>
                <div>
                  <button className="btn">SIGN UP</button>
                  <p>Have an Account? <a className="link" href="#">Login Here!</a></p>
                </div>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );*/

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
              <div className="input-contenedor">
                  <FaEnvelope  className="icono" />
                  <input type="text" placeholder="example@domain.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>

              <body style={{ marginTop: '20px' }}>Contraseña</body>
              <div className="input-contenedor">
                  <FaLock  className="icono" />
                  <input type="Password" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
              </div>
              <body>¿Olvidó la contraseña?</body>

              <button style={{ marginTop: '20px' }} className="btn_naranja">Iniciar sesión</button>
              <body> ¿No tienes una cuenta? <Link to="/registrarse" style={{color: '#018ABD', fontWeight: 'bold', marginLeft: '80px'}}>Registrarse</Link></body>

          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Login;
