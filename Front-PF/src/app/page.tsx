import React from "react";
import { DashLink } from "@/components/DashLink";
import { Private } from "@/components/Private";
import Link from "next/link";
import { FaPlaneDeparture } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BiSolidBusiness } from "react-icons/bi";

export default function Home() {
  return (
    <section className="h-screen xl:flex-row xl:justify-center xl:gap-20 flex flex-col items-center justify-around transition-all duration-500 ease-in-out">
      <Private />

      <div className="text-center">
        <Link
          href="/viajes"
          className="bg-blue-950 hover:bg-[#231d38] w-[148px] h-[148px] rounded-full flex items-center justify-center xl:w-[270px] xl:h-[270px]"
        >
          <FaPlaneDeparture className="text-white text-7xl xl:text-9xl" />
        </Link>
        <p className="mt-3 font-bold text-2xl xl:text-4xl">Viajes</p>
      </div>

      <div className="text-center">
        <Link
          href="/productos"
          className="bg-blue-950 hover:bg-[#231d38] w-[148px] h-[148px] rounded-full flex items-center justify-center xl:w-[270px] xl:h-[270px]"
        >
          <MdOutlineProductionQuantityLimits className="text-white text-7xl xl:text-9xl" />
        </Link>
        <p className="mt-3 font-bold text-2xl xl:text-4xl">Productos</p>
      </div>

      <div className="text-center">
        <Link
          href="/proveedores"
          className="bg-blue-950 hover:bg-[#231d38] w-[148px] h-[148px] rounded-full flex items-center justify-center xl:w-[270px] xl:h-[280px]"
        >
          <BiSolidBusiness className="text-white text-7xl xl:text-9xl" />
        </Link>
        <p className="mt-3 font-bold text-2xl xl:text-4xl">Proveedores</p>
      </div>


      <DashLink />
    </section>
  );
}
