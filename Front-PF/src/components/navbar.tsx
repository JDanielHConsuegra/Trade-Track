"use client";

import React, { useState } from "react";
import {  BiMenu } from 'react-icons/bi';
import { AiFillHome, AiOutlineRollback } from 'react-icons/ai';
import { FaPlane, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { usePathname, useRouter } from "next/navigation";

import { useAuthContext } from "@/context/authContext";

import { MenuDesplegable } from "./MenuDesplegable";
import Link from "next/link";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LuBriefcaseBusiness } from "react-icons/lu";


interface IProps {
  title?: string;
}

export const Navbar: React.FC<IProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, resetUserData } = useAuthContext();
  const pathname = usePathname();




  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-around md:justify-center md:px-20 items-center px-2 py-8 md:py-6 font-[Poppins] bg-blue-950 rounded-b-4xl w-screen text-center ">
      {/* MOBILE */}
      {/* Menú desplegable */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer rounded border border-white hover:scale-110 transition-transform duration-300">
        <BiMenu className="text-3xl text-white" />
        </button>

        {isOpen && <MenuDesplegable onClose={()=> setIsOpen(!isOpen)} /> }
      </div>

      {/* Título */}
      <ul>
        <li className="text-2xl md:hidden text-white font-[700] flex justify-center">
          <span className="text-center">
            {title}
          </span>
        </li>
      </ul>

      {/* Botón de volver */}
      <button
        className="cursor-pointer md:hidden hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center"
        onClick={()=>(
          router.back()
        )}
      >
      <AiOutlineRollback className="text-3xl md:text-4xl text-red-500" />
        <span className="md:text-lg">Volver</span>
      </button>
      

      {/* DESKTOP */}
      {/* Botones de navegación */}
      <div className="gap-14 hidden md:flex items-center">
      <Link
      href={"/"}
        className={`cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center${pathname === "/" ? "bg-blue-800 text-white" : "hover:bg-blue-900 text-gray-300"}`}
      >
      <AiFillHome className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Inicio</span>
      </Link>
      <Link
      href={"/viajes"}
        className={`cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center ${pathname.includes("viajes") && " font-bold underline"}`}
      >
      <FaPlane className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Viajes</span>
      </Link>
      <Link
      href={"/productos"}
      className={`cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center ${pathname.includes("productos") && " font-bold underline"}`}>
      <MdOutlineProductionQuantityLimits className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Productos</span>
      </Link>
      <Link
      href={"/proveedores"}
      className={`cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center ${pathname.includes("proveedores") && " font-bold underline"}`}>

      <LuBriefcaseBusiness className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Proveedores</span>
      </Link>
      
      <Link
      href={user?.admin === false ? "/dashboardUser/profile" : "/dashboardAdmin/users"}
        className="cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center"
      >
      <FaUser className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Perfil</span>
      </Link>

      <button
        className="cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center"
        onClick={()=>(
          resetUserData()
        )}
      >
      <FaSignOutAlt className="text-3xl md:text-4xl text-red-500" />
        <span className="text-lg">Log-Out</span>
      </button>
      
      </div>
    </nav>
    <div className="h-[100px] "></div>
    </>
  );
};