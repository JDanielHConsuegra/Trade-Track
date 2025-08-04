import Link from "next/link"

interface IProps {
    text: string;
    href: string;
}


export const LinkRed: React.FC<IProps> = ({text, href}) =>{
    return (
        <div className="flex justify-center items-center mt-5 mb-5">
            <Link href={href} className="w-fit pr-6 pl-6 pt-2 pb-2 bg-red-700 text-white rounded-3xl font-bold hover:bg-red-800 font-[Poppins] transition-colors duration-700 m-auto"> {text} </Link>
        </div>
    )
}