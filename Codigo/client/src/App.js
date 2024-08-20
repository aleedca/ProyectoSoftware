// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Edit from './Edit';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/editar" element={<Edit />} />
        
      </Routes>
    </Router>
  );
}

export default App;
