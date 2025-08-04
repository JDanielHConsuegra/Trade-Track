import { IProvider } from "@/types"
import React from "react"
import { BiSolidBusiness } from 'react-icons/bi';
import { Private } from "./Private";

interface ProviderDetailsProps {
    provider: IProvider
}

export const ProviderDetails: React.FC<ProviderDetailsProps> = ({provider})=> {
return(
    <div className="bg-white min-h-screen p-8">
        <Private/>
        <div className="max-w-2xl mx-auto shadow-lg rounded-xl p-8 bg-blue-950 text-white">
            <div className="flex items-center mb-6">
            <div className="bg-red-600 rounded-full h-20 w-20 flex items-center justify-center text-4xl font-bold mr-4">
               <BiSolidBusiness className="text-white" />
                {provider.name.charAt(0)}
            </div>
            <div>
                <h2 className="text-2xl font-semibold">{provider.name}</h2>
                <p className="text-gray-200">{provider.wechat_contact}</p>
            </div>
            </div>
            <div className="space-y-3">
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Numero de Telefono:</span>
                <span className="text-gray-200">{provider.phone_number}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Dirección:</span>
                <span className="text-gray-200">{provider.address}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Ciudad:</span>
                <span className="text-gray-200">{provider.city}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Género Principal:</span>
                <span className="text-gray-200">{provider.master_genre}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Observaciones:</span>
                <span className="text-gray-200">{provider.observation}</span>
            </div>
            </div>
        </div>
    </div>
)
}