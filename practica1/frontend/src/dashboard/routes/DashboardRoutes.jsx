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
import UserPaymentHistory from "../user/UserPaymentHistory.jsx";
import UserTickets from "../user/UserTickets.jsx";
import StaffProfile from "../personal/StaffProfile";
import StaffTickets from "../personal/StaffTickets";
import UserAccount from "../user/UserAccount.jsx";
import Comprar from "../../interfaces/Comprar.jsx";

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
        <Route path="/client/profile" element={<UserAccount />} />
        <Route path="/client/tickets" element={<UserTickets />} />
        <Route path="/client/history" element={<UserPaymentHistory />} />
        <Route path="/client/buy" element={<Comprar />} />
        
        {/* Rutas de personal */}
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/staff/flights" element={<StaffFlights />} />
        <Route path="/staff/payments" element={<StaffPayments />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/tickets" element={<StaffTickets />} />
        
        {/* Ruta por defecto para manejar URLs desconocidas */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </HomeLayout>
  );
};

export default DashboardRoutes;