
//import './FormLogin.css';
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import imagen from './Assets/inicio.png';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState('');

  const [listOfPosts, setListOfPosts] = useState([]);
  /*useEffect(() => {
    axios.get("http://localhost:3001/basic").then((response) => {
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
          <img style={{ marginRight: '100px'}} src={imagen} alt='Imagen Login' />
          </div>
  
          {/* Columna para el formulario */}
          <div style={{width : '368px'}}>
            
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '48px', color: '#004581'  }}>Bienvenido</body>
              
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '36px', color: '#018ABD'  }}>Gestión Cursos</body>
              
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '28px', color: '#AFAFAF'  }}>Técnico en logística e inventarios</body>
              
            
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px'  }}>Información sobre FUNDATEC</body>
              
              <body style={{ marginTop: '5px',textAlign:"end", color: 'gray', fontSize: '16px',color: '#6B7280'  }}>El Tecnológico de Costa Rica pone al servicio del sector productivo el potencial de recursos profesionales y de infraestructura a través de su Fundación.</body>
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px'  }}>Contacto</body>
              
              <body style={{ marginTop: '5px',textAlign:"end", color: 'gray', fontSize: '16px',color: '#6B7280'  }}  >fundatec@tec.ac.cr <br/>
              https://www.tec.ac.cr/fundatec</body>
              <button style={{ marginTop: '20px' }} className="btn_naranja" onClick={() => navigate('/login')}>Continuar</button>
              <body style={{ marginTop: '20px',textAlign:"end", fontWeight: 'bold', fontSize: '16px',textAlign: 'center'  }}>¿No sabes como usar la plataforma?</body>
              <body style={{color: '#018ABD', fontWeight: 'bold', textAlign:'center'}}>  <Link to="" >Manual de usuario</Link></body>

              
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Inicio;
