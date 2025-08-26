// src/router/Routers.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Home e Login
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";

// Inspeção
import InspecaoPage from "../pages/inspecao/Inspecao";
import InspecaoRegister from "../pages/inspecao/InspecaoRegister";

// MSIM
import MSIMPage from "../pages/msim/MSIM";
import MSIMRegister from "../pages/msim/MSIMRegister";

export default function Routers() {
  return (
    <Routes>
      {/* Bloco de rotas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* Home */}
        <Route path="/home" element={<HomePage />} />

        {/* Inspeção */}
        <Route path="/inspecao" element={<InspecaoPage />} />
        <Route path="/inspecao/register" element={<InspecaoRegister />} />
        <Route path="/inspecao/edit/:id" element={<InspecaoRegister />} />
        
        {/* MSIM */}
        <Route path="/msim" element={<MSIMPage />} />
        <Route path="/msim/register" element={<MSIMRegister />} />
        <Route path="/msim/edit/:id" element={<MSIMRegister />} />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}
