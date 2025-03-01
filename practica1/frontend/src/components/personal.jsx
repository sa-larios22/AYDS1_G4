// src/components/personal.jsx
import { useState } from 'react';

const Personal = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <ProfileTab />;
      case 'boletos':
        return <TicketsTab />;
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerTextStyle}>Dashboard - Usuario Personal</h2>
      <div style={tabContainerStyle}>
        <button
          style={activeTab === 'perfil' ? activeTabButtonStyle : tabButtonStyle}
          onClick={() => setActiveTab('perfil')}
        >
          Mi Perfil
        </button>
        <button
          style={activeTab === 'boletos' ? activeTabButtonStyle : tabButtonStyle}
          onClick={() => setActiveTab('boletos')}
        >
          Gestión de Boletos
        </button>
      </div>
      <div style={panelStyle}>
        {renderTabContent()}
      </div>
    </div>
  );
};

const ProfileTab = () => {
  // Datos de ejemplo; en la implementación real se obtendrían de la API o del contexto de autenticación.
  const userData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@aeropuertoquetzal.com',
    telefono: '12345678'
  };

  return (
    <div style={contentStyle}>
      <h3 style={sectionHeaderStyle}>Mi Perfil</h3>
      <div style={cardStyle}>
        <p>
          <strong>Nombre:</strong> {userData.nombre}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {userData.telefono}
        </p>
        <button style={editButtonStyle}>Editar Información</button>
      </div>
    </div>
  );
};

const TicketsTab = () => {
  // Datos de ejemplo para la asignación de precios y tipos de boletos
  const flights = [
    {
      id: 1,
      vuelo: 'AV1234',
      origen: 'Guatemala',
      destino: 'Madrid',
      precio: 300,
      tipo: 'Económica'
    },
    {
      id: 2,
      vuelo: 'AV5678',
      origen: 'Guatemala',
      destino: 'Lima',
      precio: 250,
      tipo: 'Ejecutiva'
    }
  ];

  // Datos de ejemplo para el resumen del estado de boletos
  const ticketSummary = {
    vendidos: 150,
    disponibles: 50
  };

  return (
    <div style={contentStyle}>
      <h3 style={sectionHeaderStyle}>Gestión de Boletos</h3>
      <div style={cardStyle}>
        <h4>Asignación de Precios y Tipos</h4>
        <p>Actualiza el precio y el tipo de boleto para cada vuelo:</p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Número de Vuelo</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.vuelo}</td>
                <td>{flight.origen}</td>
                <td>{flight.destino}</td>
                <td>{flight.precio}</td>
                <td>{flight.tipo}</td>
                <td>
                  <button style={smallButtonStyle}>Editar</button>
                  <button style={smallButtonStyle}>Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h4>Estado de Boletos</h4>
        <p>Resumen del estado de boletos:</p>
        <div style={summaryStyle}>
          <div style={summaryItemStyle}>
            <strong>Vendidos:</strong> {ticketSummary.vendidos}
          </div>
          <div style={summaryItemStyle}>
            <strong>Disponibles:</strong> {ticketSummary.disponibles}
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h4>Agregar Nuevo Vuelo</h4>
        <form style={formStyle}>
          <div style={formGroupStyle}>
            <label>Número de Vuelo:</label>
            <input type="text" style={inputStyle} placeholder="AV..." />
          </div>
          <div style={formGroupStyle}>
            <label>Origen:</label>
            <input type="text" style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label>Destino:</label>
            <input type="text" style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label>Precio:</label>
            <input type="number" style={inputStyle} />
          </div>
          <div style={formGroupStyle}>
            <label>Tipo:</label>
            <select style={inputStyle}>
              <option value="Economica">Económica</option>
              <option value="Ejecutiva">Ejecutiva</option>
              <option value="Primera">Primera Clase</option>
            </select>
          </div>
          <button type="submit" style={submitButtonStyle}>Agregar</button>
        </form>
      </div>
    </div>
  );
};

// Estilos en línea
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const headerTextStyle = {
  marginBottom: '10px',
  color: '#2c3e50'
};

const tabContainerStyle = {
  marginBottom: '20px'
};

const tabButtonStyle = {
  padding: '10px 20px',
  marginRight: '10px',
  backgroundColor: '#ccc',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px'
};

const activeTabButtonStyle = {
  ...tabButtonStyle,
  backgroundColor: '#2c3e50',
  color: 'white'
};

const panelStyle = {
  backgroundColor: '#f4f4f4',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const contentStyle = {
  marginBottom: '20px'
};

const sectionHeaderStyle = {
  color: '#2c3e50'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '5px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  marginBottom: '20px'
};

const editButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px'
};

const smallButtonStyle = {
  padding: '5px 10px',
  marginRight: '5px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const formGroupStyle = {
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%'
};

const submitButtonStyle = {
  padding: '10px',
  backgroundColor: '#2c3e50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const summaryStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '10px'
};

const summaryItemStyle = {
  backgroundColor: '#ecf0f1',
  padding: '10px 20px',
  borderRadius: '4px',
  fontWeight: 'bold'
};

export default Personal;
