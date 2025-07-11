import React, { createContext, useContext } from "react";

interface AuthContextProps {
  token: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Mock always authenticated
  const token = "mock-token";

  const login = (access: string, refresh: string) => {
    console.log("Mock login");
  };

  const logout = () => {
    console.log("Mock logout");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
