import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaPlane, FaUser } from "react-icons/fa";

import { useAuthContext } from "@/context/authContext";

import { SidebarItem } from "./sideBar";





export const MenuDesplegable = ({onClose}:{onClose: ()=> void }): ReactNode =>{
  const {user} = useAuthContext()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = (): undefined => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
 return (
             <div className={`fixed left-0 top-0 h-screen w-50 bg-blue-950 flex flex-col border-black shadow-lg shadow-black z-50 p-4 py-2 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div onClick={handleClose} className="p-1 rounded-full w-fit self-end mb-3 hover:bg-blue-700 cursor-pointer">
              <IoCloseSharp size={20} color="white" />
              </div>
             <ul className="text-white text-lg font-medium flex flex-col space-y-4">
              
              <Image
              src={"/tradeTrack.jpg"}
              alt="img"
              width={140}
              height={140}
              className="self-center rounded"
              />
              <hr></hr>
               <SidebarItem
               href="/"
               label="Inicio"
               icon={<AiFillHome/>}
               />

               {/* <li>
               <Link href="/viajes" className="block w-full p-3 rounded-lg hover:bg-blue-900 transition-colors duration-200">
                 Viajes
               </Link>
               </li> */}

               <SidebarItem
               href="/viajes"
               label="Viajes"
               icon={<FaPlane />}
               />

               {/* <li>
               <Link href="/productos" className="block w-full p-3 rounded-lg hover:bg-blue-900 transition-colors duration-200">
                 Producto
               </Link>
               </li> */}

               <SidebarItem
               href="/productos"
               label="Productos"
               icon={<MdOutlineProductionQuantityLimits />}
               />

                <SidebarItem
               href="/proveedores"
               label="Proveedores"
               icon={<LuBriefcaseBusiness />}
               />

               {/* <li>
               <Link href={ user?.admin === false ? "/dashboardUser" : "/dashboardAdmin"} className="block w-full p-3 rounded-lg hover:bg-blue-900 transition-colors duration-200">
                 { user?.admin === false ? "Perfil Usuario" : "Perfil Admin"}
               </Link>
               </li> */}
              {
                user?.admin === false ? (
                  <SidebarItem
               href="/dashboardUser/profile"
               label="Perfil"
               icon={<FaUser />}
               />
                ) : (
                  <SidebarItem
               href="/dashboardAdmin/users"
               label="Perfil"
               icon={<FaUser />}
               />
                )
              }
                

             </ul>
             </div>
         )
}