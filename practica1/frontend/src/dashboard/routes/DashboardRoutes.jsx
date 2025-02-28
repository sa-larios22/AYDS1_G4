import { Route, Routes } from "react-router-dom"
import { Flights } from "../Flights"
import { Home } from "../Home"
import { AdminDashboard } from "../admin"
import { GestionUsuarios } from "../admin/GestionUsuarios"
import StaffDashboard from "../personal/StaffDashboard"
import ClientDashboard from "../user/ClientDashboard"

export const DashboardRoutes = () => {

    return (
        <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/admin/users" element={<GestionUsuarios />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
    )
}
