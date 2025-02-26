// src/pages/Home.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  // Mensajes por rol
  let welcomeMessage = "Bienvenido a Mi App";
  let additionalMessage = "Selecciona una opción del menú.";
  let icon = "👤"; // Por defecto, invitado

  if (user) {
    switch (user.role) {
      case 'admin':
        welcomeMessage = "Bienvenido, Administrador";
        additionalMessage = "Tienes acceso completo a todas las funcionalidades.";
        icon = "🛠️";
        break;
      case 'client':
        welcomeMessage = "Bienvenido, Cliente";
        additionalMessage = "Consulta tus boletos y el historial de compras.";
        icon = "🛒";
        break;
      case 'staff':
        welcomeMessage = "Bienvenido, Personal";
        additionalMessage = "Accede al panel de gestión de vuelos y boletos.";
        icon = "👥";
        break;
      default:
        welcomeMessage = "Bienvenido a Mi App";
        additionalMessage = "Selecciona una opción del menú.";
    }
  } else {
    welcomeMessage = "Bienvenido, Invitado";
    additionalMessage = "Por favor, inicia sesión para acceder a más funciones.";
  }

  return (
    <div style={containerStyle}>
      <h2>{welcomeMessage}</h2>
      <p>{additionalMessage}</p>
      <div style={iconContainerStyle}>
        <span style={iconStyle}>{icon}</span>
      </div>
    </div>
  );
};

const containerStyle = {
  textAlign: 'center',
  padding: '20px'
};

const iconContainerStyle = {
  marginTop: '20px',
  fontSize: '50px'
};

const iconStyle = {
  margin: '0 10px'
};

export default Home;
