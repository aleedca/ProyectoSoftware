
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLock, FaEnvelope } from 'react-icons/fa';

import imagen from './Assets/login.png';

function Register() {

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
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
                  <label className="sub_title" htmlFor="email">Email</label>
                  <input placeholder="Enter your email" id="email" className="form_style" type="email" />
                </div>
                <div className="form_group">
                  <label className="sub_title" htmlFor="password">Password</label>
                  <input placeholder="Enter your password" id="password" className="form_style" type="password" />
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
            <h1>Crear cuenta</h1>
            
            
              <body style={{ marginTop: '20px' }}>Correo electrónico</body>
              <div className="input-contenedor">
                  <FaEnvelope  className="icono" />
                  <input type="text" placeholder="example@domain.com" value={Email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <body style={{ marginTop: '20px' }}>Contraseña</body>
              <div className="input-contenedor">
                  <FaLock  className="icono" />
                  <input type="password" placeholder="Ingrese la contraseña" value={Password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <body>¿Olvidó la contraseña?</body>

              <button style={{ marginTop: '20px' }} className="btn_naranja">Iniciar sesión</button>
             

          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Register;
