// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Edit from './Edit';
import RecuperarContrasena from './RecuperarContrasena';
import CrearNuevaContrasena from './CrearNuevaContrasena';
import Inicio from './Inicio';

import Calendar from './Components/Calendar.jsx'; 
import YearView from './Components/YearView.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Popup from './Components/Popup.jsx';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/editar" element={<Edit />} />
        <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
        <Route path="/crearnuevacontrasena" element={<CrearNuevaContrasena />} />
        <Route path="/login" element={<Login />} />

        <Route path="/calendar" element={<Calendar />} />
        <Route path="/yearview" element={<YearView />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/popup" element={<Popup />} />

      </Routes>
    </Router>
  );
}

export default App;
