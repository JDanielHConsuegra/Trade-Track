"use client";
import { LinkBlue } from "@/components/linkBlue";
import { LinkRed } from "@/components/linkRed";
import { Navbar } from "@/components/navbar";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { getTrips } from "@/service/trips";
import { ITrip } from "@/types";
import { useAuthContext } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

export default function ViajesPage() {
    const { user, token } = useAuthContext();
    const [trips, setTrips] = useState<ITrip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            if (user && token) {
                const data = await getTrips(user.id, token);
                setTrips(data);
                setLoading(false);
            }
        };
        fetchTrips();
    }, [user, token]);

    console.log("Trips data:", trips);
    

    if (loading) {
        return <Loading text="Cargando Viajes..." />;
    }
    

    return (
            <section className=" flex flex-col items-center justify-start w-full h-screen">
                <Private/>
                <Navbar title="Viajes"/>
            {
            trips &&
            <div className="flex items-center gap-5 mt-40 bg-gray-100 p-5 hover:bg-blue-100 cursor-pointer transition-colors duration-200 rounded-lg">
            <div className="flex flex-col items-center">
                <div className=" w-5 h-5 mb-2 rounded-full bg-green-400"/>
                <p>Viaje Activo</p>
            </div>
            <div className="flex flex-col items-center">
                <div className=" w-5 h-5 mb-2 rounded-full bg-blue-300"/>
                <p>Viaje InActivo</p>
            </div>
            <div className="flex flex-col items-center">
                <div className=" w-5 h-5 mb-2 rounded-full bg-red-600"/>
                <p>Viaje Hoy</p>
            </div>
            </div>
            }
            <div className="mt-10 mb-5">
            {
                trips.length > 0 ? (
                    
                    trips.map((t, index) => (
                        
                        <LinkBlue date={t.date} key={index} text={`Viaje #${index + 1}`} href= {`/viajes/${t.id}`} />
                    ))
                ) : (
                    <NotFound text="No Hay Viajes Disponibles"/>
                )
            }
            </div>
            <LinkRed text="Agregar nuevo viaje" href="/viajes/agregarViaje"/>
            </section>
    );
}