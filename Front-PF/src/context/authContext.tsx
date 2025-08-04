"use client";

import { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

// Tipos de contexto
type AuthContext = {
  user: IUser | null;
  modificacion: boolean;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  saveUserData: (data: SaveUserPayload) => void;
  resetUserData: () => void;
  toggleModificacion: () => void;
};

type SaveUserPayload = {
  user: IUser;
  token: string;
  login: boolean;
};

// Creación del contexto
export const AuthContext = createContext<AuthContext | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [modificacion, setModificacion] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // ✅ nuevo estado

  // Recuperar datos del usuario desde localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedAuth = localStorage.getItem("isAuth");

    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const parsedAuth = storedAuth ? JSON.parse(storedAuth) : false;

      if (parsedUser && storedToken && typeof parsedAuth === "boolean") {
        setUser(parsedUser);
        setToken(storedToken);
        setIsAuth(parsedAuth);
      }
    } catch (err) {
      console.error("❌ Error al parsear datos de localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuth");
    } finally {
      setLoading(false); // ✅ establecer como cargado
    }
  }, []);

  // Guardar datos del usuario en localStorage
  const saveUserData = (data: SaveUserPayload) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("isAuth", JSON.stringify(data.login));

    setUser(data.user);
    setIsAuth(data.login);
    setToken(data.token);
  };

  // Modificar el estado de modificación
  const toggleModificacion = () => {
    setModificacion(prev => !prev);
  };

  // Resetear datos del usuario
  const resetUserData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");

    setUser(null);
    setIsAuth(false);
    setToken(null);
  };

  useEffect(() => {
    console.log("Estado actualizado:", { user, isAuth, token, loading });
  }, [user, isAuth, token, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuth,
        modificacion,
        loading, // ✅ lo pasamos al contexto
        saveUserData,
        resetUserData,
        toggleModificacion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};