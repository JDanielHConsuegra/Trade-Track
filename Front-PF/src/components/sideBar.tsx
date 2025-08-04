"use client";
import {
  FaUser,
  FaCog,
  FaTachometerAlt,
  FaPlane,
} from "react-icons/fa";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { useAuthContext } from "@/context/authContext";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export function Sidebar() {
  const { user } = useAuthContext();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Botón para pantallas pequeñas */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-900 text-white rounded-md shadow-md"
        onClick={() => setShowMenu(true)}
      >
        <IoMenuSharp className="text-2xl" />
      </button>

      {/* Sidebar fijo en pantallas grandes */}
      <aside className="hidden md:flex w-64 bg-blue-950 text-white flex-col">
        <SidebarContent user={user} />
      </aside>

      {/* Sidebar desplegable en móviles */}
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-blue-950 bg-opacity-90 text-white flex flex-col w-64 p-4 shadow-lg transition duration-300">
          <button
            className="text-white self-end mb-4"
            onClick={() => setShowMenu(false)}
          >
            <IoCloseSharp className="text-2xl" />
          </button>
          <SidebarContent user={user} />
        </div>
      )}
    </>
  );
}

function SidebarContent({ user }: { user: any }) {
  const { resetUserData } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    resetUserData();
    toast.success("Sesión cerrada correctamente");
    router.push("/login");
  };

  return (
    <>
      {/* Logo superior */}
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        <Image
          src={"/tradeTrack.jpg"}
          alt="sideBar"
          width={260}
          height={142}
          className="rounded"
        />
      </div>

      {/* Navegación justo debajo del logo */}
      <nav className="flex flex-col p-4 space-y-4">
        <SidebarItem
          icon={<FaTachometerAlt />}
          label="Dashboard"
          href={user?.admin ? "/dashboardAdmin" : "/dashboardUser"}
        />
        {!user?.admin ? (
          <>
            <SidebarItem icon={<FaUser />} label="Perfil" href="/dashboardUser/profile" />
            <SidebarItem icon={<FaCog />} label="Suscripción" href="/dashboardUser/settings" />
          </>
        ) : (
          <>
            <SidebarItem icon={<FaPlane />} label="Viajes" href="/dashboardAdmin/viajes" />
            <SidebarItem
              icon={<MdOutlineProductionQuantityLimits />}
              label="Productos"
              href="/dashboardAdmin/productos"
            />
            <SidebarItem
              icon={<LuBriefcaseBusiness />}
              label="Proveedores"
              href="/dashboardAdmin/proveedores"
            />
            <SidebarItem icon={<FaUser />} label="Users" href="/dashboardAdmin/users" />
          </>
        )}
        <SidebarItem icon={<AiFillHome />} label="Home" href="/" />
        
        {/* Botón de Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-lg py-2 px-3 rounded-lg transition-colors hover:bg-red-600 text-gray-300 hover:text-white mt-auto"
        >
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </nav>
    </>
  );
}

function SidebarItem({ icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 text-lg py-2 px-3 rounded-lg transition-colors ${
        isActive ? "bg-blue-800 text-white" : "hover:bg-blue-900 text-gray-300"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}