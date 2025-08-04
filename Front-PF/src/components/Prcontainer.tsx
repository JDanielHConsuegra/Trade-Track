import {  IProvider } from "@/types";
import Link from "next/link";

interface IProps {
    data: IProvider[];
}

export const Prcontainer: React.FC<IProps> = ({data}) =>{
return(
    <section className="w-full p-5 flex-wrap mt-3 pl-2 bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-lg shadow-md transition-all duration-300 cursor-pointer max-w-[800px] m-auto">
        {data.map((d, index) =>(
            <Link href={`/proveedores/details/${d.id}`} key={index} className="flex h-40 p-2 justify-start items-center">
            <div className="flex flex-wrap items-start justify-between gap-3 ml-4 w-full">
            <span>Nombre: <b>{d.name}</b></span>
            <span>Ciudad: <b>{d.city}</b></span>
            <span>Wechat: <b>{d.wechat_contact}</b></span>
            <span>Telefono: <b>{d.phone_number}</b></span>
            <span>Direccion: <b>{d.address}</b></span>
            <span>Activo: <b>{d.is_active ? "Sí" : "No"}</b></span>
            </div>
            </Link>
        ))}
    </section>
)
}