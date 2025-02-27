// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Flights from './pages/Flights';
import Home from './pages/Home';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import StaffDashboard from './pages/StaffDashboard';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
