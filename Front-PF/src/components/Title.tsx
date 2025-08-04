"use client";
import { usePathname } from "next/navigation";
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { useAuthContext } from "@/context/authContext";

export const Title: React.FC = () => {
    const pathname = usePathname();
    const { user } = useAuthContext();

    return (
        <>
        <div className="flex bg-blue-950 items-center justify-center h-16 shadow-md">
        <h1 className="text-2xl font-bold text-white">{
            pathname.includes("productos") ? "Productos" :
            pathname.includes("viajes") ? "Viajes" :
            pathname.includes("usuarios") ? "Usuarios" :
            pathname.includes("proveedores") ? "Proveedores" :
            pathname.includes("profile") ? "Perfil" :
            pathname.includes("settings") ? "Tu Suscripción" :
            pathname.includes("dashboardAdmin") ? "Dashboard Admin" : "Dashboard Usuario"
            }</h1>

        <span> {
            user?.admin ? <MdAdminPanelSettings className="text-4xl ml-2 text-white" /> : <FaUserAlt className="text-4xl ml-2 text-white" />
            } </span>
        </div>
        </>
    );
}