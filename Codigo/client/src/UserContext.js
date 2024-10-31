// src/UserContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [fullName, setFullName] = useState('');
    const [link, setLink] = useState('https://inlotec.azurewebsites.net');

    return (
        <UserContext.Provider value={{ fullName, setFullName, link, setLink }}>
            {children}
        </UserContext.Provider>
    );
};
