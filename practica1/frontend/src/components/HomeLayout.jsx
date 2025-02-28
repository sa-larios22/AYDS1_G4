// src/components/Layout.jsx
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks';

export const HomeLayout = ({ children }) => {
  
  const { user } = useAuth();

  return (
    <div style={containerStyle}>
      {/* Encabezado fijo */}
      <header style={headerStyle}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 24px'}}>
          <h1>Aeropuerto Quetzal</h1>

        </div>
      </header>

      {/* Menú lateral fijo */}
      <aside style={sidebarStyle}>
        <nav style={navStyle}>
          <ul style={menuListStyle}>
            <li style={menuItemStyle}>
              <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle} end>
                <span style={iconStyle}>🏠</span>Inicio
              </NavLink>
            </li>
            <li style={menuItemStyle}>
              <NavLink to="/flights" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                <span style={iconStyle}>✈️</span>Vuelos
              </NavLink>
            </li>

            {/* Opciones para Administrador */}
            {user?.role === 'ADMIN' && (
              <>
                <li style={menuItemStyle}>
                  <NavLink to="/admin" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>⚙️</span>Panel de Administración
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/admin/users" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>👤</span>Gestión de Usuarios
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/admin/payments" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>💵</span>Historial de Pagos
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/register" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>➕</span>Crear usuario
                  </NavLink>
                </li>
              </>
            )}

            {/* Opciones para Cliente (Pasajero) */}
            {user?.role === 'USER' && (
              <>
                <li style={menuItemStyle}>
                  <NavLink to="/client" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>🛒</span>Mi Cuenta
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/client/tickets" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>🎟️</span>Mis Boletos
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/client/history" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>📜</span>Historial de Compras
                  </NavLink>
                </li>
              </>
            )}

            {/* Opciones para Personal */}
            {user?.role === 'PERSONAL' && (
              <>
                <li style={menuItemStyle}>
                  <NavLink to="/staff" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>👥</span>Panel de Personal
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/staff/flights" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>🛫</span>Gestión de Vuelos
                  </NavLink>
                </li>
                <li style={menuItemStyle}>
                  <NavLink to="/staff/tickets" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
                    <span style={iconStyle}>🎟️</span>Gestión de Boletos
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Área principal */}
      <main style={mainStyle}>

        {children}
      </main>

      {/* Footer fijo */}
      <footer style={footerStyle}>
        <p>&copy; 2025 Aeropuerto Quetzal - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

// Definición de estilos inline
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  minHeight: '100vh'
};

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  backgroundColor: '#2c3e50',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const sidebarStyle = {
  position: 'fixed',
  top: '60px',
  left: 0,
  width: '220px',
  height: 'calc(100vh - 60px)',
  backgroundColor: '#34495e',
  padding: '20px',
  boxSizing: 'border-box'
};

const navStyle = {
  width: '100%'
};

const menuListStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0
};

const menuItemStyle = {
  marginBottom: '15px'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#bdc3c7',
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  transition: 'color 0.3s'
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#ecf0f1',
  fontWeight: 'bold'
};

const iconStyle = {
  marginRight: '10px'
};

const mainStyle = {
  marginLeft: '240px', // ancho del sidebar + margen
  marginTop: '60px',
  marginBottom: '40px',
  padding: '20px'
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '40px',
  backgroundColor: '#2c3e50',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
