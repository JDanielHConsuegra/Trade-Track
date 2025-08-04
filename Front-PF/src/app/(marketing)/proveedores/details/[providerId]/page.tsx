"use client"
import { Navbar } from "@/components/navbar";
import { ProviderDetails } from "@/components/ProviderDetails";
import { getProviderById } from "@/service/providerProducts";
import Link from "next/link";
import { GiFastBackwardButton } from 'react-icons/gi';
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

export default function ProviderIdPage() {
    const { providerId } = useParams();
    const [provider, setProvider] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof providerId === "string") {
            getProviderById(providerId).then((data) => {
                setProvider(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [providerId]);

    if (loading) {
        return <Loading text="Cargando proveedor..." />;
    }

    if (typeof providerId !== "string") {
        return (
            <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-8">
                <Link href={"/"}>
                <GiFastBackwardButton className="text-9xl hover:scale-140 transition-all duration-300 cursor-pointer text-red-500 mx-auto my-8" />
                </Link>
                <h1 className="text-center text-2xl font-bold text-red-500">Proveedor no encontrado porque no es string el parametro <span className="text-black underline">Presiona</span> el icono para devolverte </h1>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-8">
                <Link href={"/"}>
                <GiFastBackwardButton className="text-9xl hover:scale-140 transition-all duration-300 cursor-pointer text-red-500 mx-auto my-8" />
                </Link>
                <h1 className="text-center text-2xl font-bold text-red-500">Proveedor no encontrado <span className="text-black underline">Presiona</span> el icono para devolverte </h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <Navbar title="Detalles del Proveedor" />
            <ProviderDetails provider={provider} />
        </div>
    );
}
