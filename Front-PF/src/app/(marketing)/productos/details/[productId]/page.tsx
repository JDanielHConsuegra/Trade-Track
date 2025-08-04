"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { ProductDetails } from "@/components/ProductDetails";
import { getProductById } from "@/service/providerProducts";

import type { IProduct } from "@/types"; // adjust import path if needed
import { Loading } from "@/components/loading";
import { NotFound } from "@/components/notFound";

export default function ProductIdPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const fetchProduct = async () => {
            if (typeof productId === "string") {
                const data = await getProductById(productId);
                setProduct(data);
            } else {
                setProduct(null);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);

    if (loading){
        return <Loading text="Cargando producto..." />;
    }

    if (!product) {
        return <NotFound text="Producto no encontrado" />;
    }
    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Navbar title="Detalles del Producto" />
            <ProductDetails product={product} />
        </div>
    );
}
