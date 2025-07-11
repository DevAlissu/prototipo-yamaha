// src/router/Routers.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Home e Login
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";

// Equipamentos
import EquipmentsPage from "../pages/equipments/Equipments";
import EquipmentsRegister from "../pages/equipments/equipmentsregister/Register";
import EditEquipments from "../pages/equipments/components/EditEquipment";

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

        {/* Motocicletas */}
        <Route path="/motocicletas" element={<EquipmentsPage />} />
        <Route path="/motocicletas/register" element={<EquipmentsRegister />} />
        <Route path="/motocicletas/edit/:id" element={<EditEquipments />} />
        
        {/* Redirecionamento de equipments para motocicletas */}
        <Route path="/equipments" element={<Navigate to="/motocicletas" replace />} />
        <Route path="/equipments/register" element={<Navigate to="/motocicletas/register" replace />} />
        <Route path="/equipments/edit/:id" element={<Navigate to="/motocicletas/edit/:id" replace />} />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}
