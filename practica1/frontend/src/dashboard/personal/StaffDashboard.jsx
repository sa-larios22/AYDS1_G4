import React from 'react';

const StaffDashboard = () => {
  const userName = "Usuario";

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#f7fafc',
      fontFamily: 'Arial, sans-serif',
      padding: '20px', // Añadido para evitar que el contenido toque los bordes
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center',
    },
    icon: {
      fontSize: '50px',
      backgroundColor: '#3182ce',
      color: 'white',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      marginBottom: '10px',
      color: '#2d3748',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: '20px',
      color: '#3182ce',
      marginBottom: '20px',
      fontWeight: '600',
    },
    text: {
      lineHeight: '1.6',
      color: '#4a5568',
      marginBottom: '30px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>👥</div>
        
        <h1 style={styles.title}>
          ¡Bienvenido, {userName}!
        </h1>
        
        <h2 style={styles.subtitle}>Panel de Personal</h2>
        
        <p style={styles.text}>
          Tienes acceso a todas las herramientas de gestión como personal del aeropuerto.
          Utiliza el menú lateral para navegar entre las diferentes secciones.
        </p>
      </div>
    </div>
  );
};

export default StaffDashboard;