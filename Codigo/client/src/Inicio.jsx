
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState , useContext } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import imagen from './Assets/inicio.png';
import logo from './Assets/logo_tecnico.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Asegúrate de importar UserContext

function Inicio() {
  const navigate = useNavigate();
  const { link } = useContext(UserContext); 
  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState('');

  const [listOfPosts, setListOfPosts] = useState([]);
  /*useEffect(() => {
    axios.get(link + "/basic").then((response) => {
      setListOfPosts(response.data);
      console.log(response.data)
    });
  }, []);*/

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
    <div className='fondo-bienvenida'>
      <div className='contenedor-base-columnas'>
        <div className='contenedor-columnas-sin-ancho'>

          {/* Columna para la imagen */}
          <div className='columna '>
          <img style={{ marginRight: '200px'}} src={imagen} alt='Imagen Login' />
          </div>
  
          {/* Columna para el formulario */}
          <div style={{width : '450px'}}>
            
              <body style={{ marginTop: '0px',textAlign:"end", fontWeight: 'bold', fontSize: '48px', color: '#004581'  }}>Bienvenido</body>
              
              <body style={{ marginTop: '10px',textAlign:"end", fontWeight: 'bold', fontSize: '36px', color: '#018ABD'  }}>Gestión de cursos InloTEC</body>
              
              <body style={{ marginTop: '0px',textAlign:"end", fontWeight: 'bold', fontSize: '28px', color: '#AFAFAF'  }}>Técnico en Logística e Inventarios</body>
              
            
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px'  }}>Información sobre este técnico</body>
              
              <body style={{ marginTop: '5px',textAlign:"justify", color: 'gray', fontSize: '12px',color: '#6B7280'  }}>El Técnico en Logística e Inventarios fue diseñado y desarrollado por la Escuela de Producción Industrial del TEC y está dirigido a personas en cargo labores relacionadas con la logística, cadenas de distribución, bodegas y similares.</body>
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px'  }}>Contacto</body>
              
              <body style={{ marginTop: '5px',textAlign:"end", color: 'gray', fontSize: '12px',color: '#6B7280'  }}  >+506 8405 2075 <br/>caplog@itcr.ac.cr <br/>
              https://www.tec.ac.cr/tecnico-logistica-inventarios</body>
              <button style={{ marginTop: '20px' }} className="btn_naranja" onClick={() => navigate('/login')}>Continuar</button>
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px',textAlign: 'center'  }}>¿No sabes como usar la plataforma?</body>
              <body style={{color: '#018ABD', fontWeight: 'bold', textAlign:'center'}}>  <Link to="" >Manual de usuario</Link></body>

              <div>
                <img style={{ position: "absolute", bottom: '100px', right: 60, zIndex: 10, width: "120px", height:"auto" }} src={logo} alt='Imagen logo' />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Inicio;
