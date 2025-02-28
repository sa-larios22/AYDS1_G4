import { Route, Routes } from "react-router-dom"
import { Home } from "../Home"
import { Flights } from "../Flights"
import { AdminDashboard } from "../admin"
import ClientDashboard from "../user/ClientDashboard"
import StaffDashboard from "../personal/StaffDashboard"

export const DashboardRoutes = () => {

    return (
        <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
    )
}
