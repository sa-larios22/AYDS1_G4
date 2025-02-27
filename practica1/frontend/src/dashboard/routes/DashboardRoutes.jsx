import { Route, Routes } from "react-router-dom"
import Home from "../Home"
import { AdminDashboard } from "../admin/AdminDashboard"
import ClientDashboard from "../user/ClientDashboard"
import StaffDashboard from "../personal/StaffDashboard"
import { Flights } from "../Flights"

export const DashboardRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/staff" element={<StaffDashboard />} />
        </Routes>
    )
}
