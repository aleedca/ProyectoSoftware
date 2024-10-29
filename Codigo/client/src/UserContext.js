// src/UserContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [fullName, setFullName] = useState('');

    return (
        <UserContext.Provider value={{ fullName, setFullName }}>
            {children}
        </UserContext.Provider>
    );
};
