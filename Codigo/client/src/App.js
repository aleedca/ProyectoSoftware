// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Edit from './Edit';
import RecuperarContrasena from './RecuperarContrasena';
import CrearNuevaContrasena from './CrearNuevaContrasena';
import Inicio from './Inicio';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/editar" element={<Edit />} />
        <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
        <Route path="/crearnuevacontrasena" element={<CrearNuevaContrasena />} />
        <Route path="/inicio" element={<Inicio />} />
        
      </Routes>
    </Router>
  );
}

export default App;
