"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import {  BiMenu } from 'react-icons/bi';
import { AiOutlineRollback } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/authContext";

import { MenuDesplegable } from "./MenuDesplegable";


interface IProps {
  title?: string;
}

export const Navbar: React.FC<IProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resetUserData} = useAuthContext();
  const router = useRouter();

  const handleLogout = (): void => {
    resetUserData();
    toast.success("Sesión cerrada correctamente");
    router.push("/login");
  };



  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-around items-center pt-12 pb-8 pl-4 pr-4 font-[Poppins] bg-blue-950 rounded-b-4xl w-full text-center ">
      
      {/* Menú desplegable */}
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer border border-white hover:scale-110 transition-transform duration-300">
        <BiMenu className="text-4xl text-white" />
        </button>

        {isOpen && <MenuDesplegable onClose={()=> setIsOpen(!isOpen)} /> }
      </div>

      {/* Título */}
      <ul>
        <li className="text-4xl text-white font-[700] w-full flex justify-center">
          <span className="w-full sm:w-auto max-w-[60vw] sm:max-w-none text-center block mx-auto">
            {title}
          </span>
        </li>
      </ul>

      {/* Botones de navegación */}
      <div className="flex gap-4">
      <button
        className="cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center"
        onClick={()=>(
          router.back()
        )}
      >
      <AiOutlineRollback className="text-4xl text-red-500" />
      Back
      </button>
      <button
        className="cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-white text-center"
        onClick={handleLogout}
      >
      <FaSignOutAlt className="text-4xl text-red-500" />
      LogOut
      </button>
      </div>
    </nav>
    <div className="h-[140px] "></div>
    </>
  );
};