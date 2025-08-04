"use client";

import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

export const LogoutButton = () => {
  const { resetUserData } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    resetUserData();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg z-50"
    >
      <FaSignOutAlt className="text-sm" />
      <span className="hidden sm:inline">Cerrar Sesión</span>
      <span className="sm:hidden">Salir</span>
    </button>
  );
}; 