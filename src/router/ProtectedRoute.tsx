import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Mock - sempre permite acesso
  return children; 
};

export default ProtectedRoute;