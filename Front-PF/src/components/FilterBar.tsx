"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
    items: string[];
    href: string;
}

export const FilterBar: React.FC<IProps> = ({items, href}) => {
    const pathname = usePathname();
    return (
        <ul className=" bg-gray-100 shadow p-3 rounded-t-2xl flex justify-start gap-8 items-center mt-5 self-start">
        {items.map((i, index) => (
            <Link
            key={index}
            href={`${href}${i}`}
            className={ 
                pathname.includes(i)
                ? "text-red-600 shadow-blue-950 font-bold underline"
                : "text-black font-bold hover:underline"
                
            }
            >
            {i}
            </Link>
        ))}
        </ul>
    )
}