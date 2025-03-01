import { Route, Routes, Navigate } from "react-router-dom";
import HomeLayout from "../../components/HomeLayout.jsx";
import { Flights } from "../Flights";
import { Home } from "../Home";
import { AdminDashboard } from "../admin";
import { GestionUsuarios } from "../admin/GestionUsuarios";
import { HistorialPagos } from "../admin/HistorialPagos";
import StaffDashboard from "../personal/StaffDashboard";
import StaffFlights from "../personal/StaffFlights";
import StaffPayments from "../personal/StaffPayments";
import ClientDashboard from "../user/ClientDashboard";
import Tickets from "../user/Tickets.jsx";

export const DashboardRoutes = () => {
  return (
    <HomeLayout>
      <Routes>
        {/* Rutas principales */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/flights" element={<Flights />} />
        
        {/* Rutas de administrador */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<GestionUsuarios />} />
        <Route path="/admin/payments" element={<HistorialPagos />} />
        
        {/* Rutas de cliente */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/client/tickets" element={<Tickets />} />
        
        {/* Rutas de personal */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/flights" element={<StaffFlights />} />
        <Route path="/staff/payments" element={<StaffPayments />} />
        
        {/* Ruta por defecto para manejar URLs desconocidas */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </HomeLayout>
  );
};

export default DashboardRoutes;

