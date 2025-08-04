import { IProduct } from "@/types";
import Link from "next/link";

interface IProps {
    data: IProduct[];
}

export const Pcontainer: React.FC<IProps> = ({data}) =>{
return(
    <section className="w-full mt-3 max-w-[800px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-lg shadow-md transition-all duration-300 cursor-pointer m-auto">
        {data.map((d, index) =>(
            <Link href={`/productos/details/${d.id}`} key={index} className="flex p-4 justify-start items-center">
            <div className="flex flex-col justify-between items-start ml-4 w-full">
            <div className="flex gap-5 mb-2">
            <span>Referencia: <b>{d.reference}</b></span>
            <span>Estado: <b>{d.state}</b></span>
            </div>
            <span className="mb-2">Nombre: <b>{d.name}</b></span>
            <div className="flex gap-4">
            <span>Precio: <b>{d.price}</b></span>
            <span>QYT: <b>{d.cuantity}</b></span>
            </div>
            </div>
            </Link>
        ))}
    </section>
)
}