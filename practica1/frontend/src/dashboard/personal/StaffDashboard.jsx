import React from 'react';

const StaffDashboard = () => {
  const userName = "Usuario";

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 100px)', /* Ajustado para considerar header/footer */
      padding: '20px'
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
      marginBottom: '20px'
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '20px',
      color: '#3182ce',
      marginBottom: '15px',
      textAlign: 'center'
    },
    text: {
      lineHeight: '1.5',
      maxWidth: '500px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
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
  );
};

export default StaffDashboard;