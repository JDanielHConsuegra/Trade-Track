"use client";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import { RiAdminLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

export const DashLink = () =>{
    const { user } = useAuthContext();
    return (
        <>
        {user?.admin === true 
        ? (
            <Link href={"/dashboardAdmin"} className=" absolute right-6 bottom-6 p-4 bg-blue-300 rounded-full hover:bg-blue-400 transition-colors duration-1000 "><RiAdminLine className="text-4xl"/></Link>
        )
        : <Link href={"/dashboardUser"} className=" absolute right-6 bottom-6 p-4 bg-blue-300 rounded-full hover:bg-blue-400 transition-colors duration-1000 "><FaUser className="text-4xl"/></Link>
    }
        </>
    )
}