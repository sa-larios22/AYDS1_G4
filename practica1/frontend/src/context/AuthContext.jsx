import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Usuario simulado: cambia 'admin' por 'client' o 'staff' para probar cada rol.
  const [user, setUser] = useState({
    id: 1,
    name: 'Usuario de Prueba',
    role: 'admin' // O 'client' o 'staff admin'
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
