import { IProduct } from "@/types"
import React from "react"
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Private } from "./Private";
interface ProductDetailsProps {
    product: IProduct
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({product})=> {
return(
    <div className="bg-white min-h-screen p-8">
        <Private />
        <div className="max-w-2xl mx-auto shadow-lg rounded-xl p-8 bg-blue-950 text-white">
            <div className="flex items-center gap-5 mb-6">
            <div className="bg-red-600 rounded-full h-20 w-20 flex items-center justify-center text-4xl font-bold mr-4">
               <MdOutlineProductionQuantityLimits className="text-white" />
                {product.name.charAt(0)}
            </div>
            <div>
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-gray-200">Valor: ${product.price}</p>
            </div>
            </div>
                <hr className="border-white my-4 w-full"></hr>
            <div className="space-y-3">
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Estado:</span>
                <span className="text-gray-200">{product.state}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Color:</span>
                <span className="text-gray-200">{product.color}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Cantidad:</span>
                <span className="text-gray-200">{product.cuantity}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Cantidad por Caja:</span>
                <span className="text-gray-200">{product.quantity_per_box}</span>
            </div>
            <div className="flex items-center">
                <span className="font-bold text-white mr-2">Categoria:</span>
                <span className="text-gray-200">{product.categoryMaster}</span>
            </div>
            </div>
        </div>
    </div>
)
}