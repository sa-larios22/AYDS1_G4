// src/components/Layout.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks';

export const HomeLayout = ({ children }) => {
  const { user, startLogOut } = useAuth();

  return (
    <div style={styles.container}>
      {/* Encabezado fijo */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Aeropuerto Quetzal</h1>
          {user && (
            <div style={styles.userSection}>
              <span style={styles.userName}>{user.name || 'Usuario'}</span>
              <button onClick={startLogOut} style={styles.logoutButton}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Menú lateral fijo */}
      <aside style={styles.sidebar}>
        <nav style={styles.nav}>
          <ul style={styles.menuList}>
            <li style={styles.menuItem}>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                }
                end
              >
                <span style={styles.icon}>🏠</span>Inicio
              </NavLink>
            </li>
            <li style={styles.menuItem}>
              <NavLink
                to="/flights"
                style={({ isActive }) =>
                  isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                }
              >
                <span style={styles.icon}>✈️</span>Vuelos
              </NavLink>
            </li>

            {/* Opciones para Administrador */}
            {user?.role === 'ADMIN' && (
              <>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/admin"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>⚙️</span>Panel de Administración
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/admin/users"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>👤</span>Gestión de Usuarios
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/admin/payments"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>💵</span>Historial de Pagos
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/register"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>➕</span>Crear usuario
                  </NavLink>
                </li>
              </>
            )}

            {/* Opciones para Cliente (Pasajero) */}
            {user?.role === 'USER' && (
              <>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/client"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>🛒</span>Mi Cuenta
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/client/tickets"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>🎟️</span>Mis Boletos
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/client/history"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>📜</span>Historial de Compras
                  </NavLink>
                </li>
              </>
            )}

            {/* Opciones para Personal */}
            {user?.role === 'PERSONAL' && (
              <>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/staff"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>👥</span>Panel de Personal
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/staff/flights"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>🛫</span>Gestión de Vuelos
                  </NavLink>
                </li>
                <li style={styles.menuItem}>
                  <NavLink
                    to="/staff/tickets"
                    style={({ isActive }) =>
                      isActive ? { ...styles.link, ...styles.activeLink } : styles.link
                    }
                  >
                    <span style={styles.icon}>🎟️</span>Gestión de Boletos
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Área principal */}
      <main style={styles.main}>{children}</main>

      {/* Footer fijo */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Aeropuerto Quetzal - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    minHeight: '100vh'
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px'
  },
  title: {
    margin: 0,
    fontSize: '24px'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center'
  },
  userName: {
    marginRight: '15px',
    fontSize: '16px'
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
    outline: 'none'
  },
  sidebar: {
    position: 'fixed',
    top: '60px',
    left: 0,
    width: '220px',
    height: 'calc(100vh - 60px)',
    backgroundColor: '#34495e',
    padding: '20px',
    boxSizing: 'border-box'
  },
  nav: {
    width: '100%'
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0
  },
  menuItem: {
    marginBottom: '15px'
  },
  link: {
    textDecoration: 'none',
    color: '#bdc3c7',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    transition: 'color 0.3s'
  },
  activeLink: {
    color: '#ecf0f1',
    fontWeight: 'bold'
  },
  icon: {
    marginRight: '10px'
  },
  main: {
    marginLeft: '240px',
    marginTop: '60px',
    marginBottom: '40px',
    padding: '20px'
  },
  footer: {
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
  }
};

export default HomeLayout;
