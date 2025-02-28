import { useEffect } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { META_AUTH } from "../store";
import { DashboardRoutes } from "../dashboard";
import { AuthRoutes } from "../auth";
import { useAuth } from "../hooks";

export const AppRouter = () => {

    const { status, startCheckToken } = useAuth();

    useEffect(() => {
        startCheckToken();
    }, []);

    return (
        <Routes>
            {
                ( status === META_AUTH.AUTHENTICATED)
                ? <Route path="/*" element={<DashboardRoutes />} />
                : <Route path="/auth/*" element={<AuthRoutes />} />
            }
            <Route path="/*" element={ <Navigate to='/auth/login' /> } />
        </Routes>
    )

}