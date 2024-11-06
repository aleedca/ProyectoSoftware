
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState ,useContext } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser, FaIdCard, FaUnlock } from 'react-icons/fa';
import imagen from './Assets/register.png'
import logo from './Assets/logo_blanco.png'

import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Asegúrate de importar UserContext
function Edit() {
  const navigate = useNavigate();
  const { link } = useContext(UserContext); 
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [nuevaContrasenna, setNuevaContrasenna] = useState('');
  const [error, setError] = useState('');


  function sendData() {
    const errors = {
      contrasenna: !contrasenna,
      correo: !correo
    };

    setError(errors);

    if (Object.values(errors).includes(true)) {
      setError('Por favor, complete todos los campos correctamente.');
      console.error('Por favor, complete todos los campos correctamente.');
      return; // Detiene la ejecución si hay errores
    }

    axios.put(link + "/editUser", {
      contrasenna,
      correo,
      nuevaContrasenna,
      nombre,
      primerApellido,
      segundoApellido

    })
      .then((response) => {
        const fullName = `${response.data[0].Name} ${response.data[0].LastName1} ${response.data[0].LastName2}`;
        navigate('/login')

      })
      .catch((error) => {
        console.error('No existe el usuario con ese correo y esa contraseña', error.response.data);
        alert('Usuario no encontrado')
        setError(error.response.data);
      });
  }
  function sendDataDelete() {
    const errors = {
      contrasenna: !contrasenna,
      correo: !correo
    };

    setError(errors);

    if (Object.values(errors).includes(true)) {
      setError('Por favor, complete los campos de correo y contraseña.');
      console.log('Por favor, complete los campos de correo y contraseña.');
      alert('Por favor, complete los campos de correo y contraseña.');
      return; // Detiene la ejecución si hay errores
    }

    axios.delete(link + "/deleteUser", {
      params: {
        contrasenna,
        correo
      }
    })
      .then((response) => {
        const fullName = `${response.data[0].Name} ${response.data[0].LastName1} ${response.data[0].LastName2}`;
        navigate('/login')
        alert('Usuario eliminado correctamente')
      })
      .catch((error) => {
        console.error('No existe el usuario con ese correo y esa contraseña', error.response.data);
        alert('Digite correctamente la contraseña y el correo')
        setError(error.response.data);
      });
  }
  return (
    <div className='fondo-crearCuenta'>
      <div className='contenedor'>
        <div className='contenedor-columnas'>

          {/* Columna para el formulario */}
          <div className='columna columna-formulario'>
            <h1>Editar cuenta</h1>

            <body>Nombre</body>
            <div className="input-contenedor">
              <FaUser className="icono" />
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <body>Primer apellido</body>
            <div className="input-contenedor">
              <FaIdCard className="icono" />
              <input type="text" placeholder="Primer apellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
            </div>

            <body>Segundo apellido</body>
            <div className="input-contenedor">
              <FaIdCard className="icono" />
              <input type="text" placeholder="Segundo apellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
            </div>

            <body>Correo</body>
            <div className="input-contenedor">
              <FaEnvelope className="icono" />
              <input type="text" placeholder="ejemplo@dominio.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>

            <body>Contraseña</body>
            <div className="input-contenedor">
              <FaLock className="icono" />
              <input type="Password" placeholder="Ingrese la contraseña" value={contrasenna} onChange={(e) => setContrasenna(e.target.value)} />
            </div>

            <body>Nueva contraseña</body>
            <div className="input-contenedor">
              <FaUnlock className="icono" />
              <input type="Password" placeholder="Confirme la contraseña" value={nuevaContrasenna} onChange={(e) => setNuevaContrasenna(e.target.value)} />
            </div>
          </div>

          {/* Columna para la imagen */}
          <div className='columna columna-imagen'>
            <img style={{ marginTop: '40px' }} src={imagen} alt='Imagen Login' />
            <button style={{ marginTop: '20px' }} onClick={sendData} className="btn_naranja">Actualizar cuenta</button>
            <button style={{ marginTop: '-4px' }} className="btn_azul" onClick={() => navigate('/calendar')}>Volver</button>
            <body> ¿Desea eliminar la cuenta? <Link to="" style={{ color: '#018ABD', fontWeight: 'bold', marginLeft: '80px' }} onClick={sendDataDelete}>Eliminar</Link></body>
          </div>
        </div>
      </div>
      <div>
        <img style={{ position: "absolute", bottom: 20, right: 40, zIndex: 10, width: "120px", height:"auto" }} src={logo} alt='Imagen logo' />
      </div>
    </div>
  );

}

export default Edit;
