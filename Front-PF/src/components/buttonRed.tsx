import React from "react"

interface IProps {
    text: string
}


export const ButtonRed: React.FC<IProps> = ({text}) => {
    return(
        <button type="submit" className={"w-fit pr-5 pl-5 pt-1 pb-1 bg-red-700 text-white rounded-3xl font-bold hover:bg-red-800 transition font-[Poppins] cursor-pointer"}>{text} </button>
    )
}