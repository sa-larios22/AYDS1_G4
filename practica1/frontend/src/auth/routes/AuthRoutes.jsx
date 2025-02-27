import { Route, Routes } from "react-router-dom"
import Home from "../Home"

export const AuthRoutes = () => {


    return (
        <Routes>
            <Route path="/login" element={<Home />} />
            <Route path="/" element='/auth/login' />
        </Routes>
    )
}