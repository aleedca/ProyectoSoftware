// src/UserContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [fullName, setFullName] = useState('');
    const [refrescar, setRefrescar] = useState(false);
    const [link, setLink] = useState('http://localhost:3001');

    return (
        <UserContext.Provider value={{ fullName, setFullName, link, setLink,refrescar, setRefrescar }}>
            {children}
        </UserContext.Provider>
    );
};
