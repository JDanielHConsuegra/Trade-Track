"use client";

import { LinkBlue } from "@/components/linkBlue";
import { Navbar } from "@/components/navbar";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { getTripStatus } from "@/helpers/getTripStatus";
import { getTripsById } from "@/service/trips";
import { useAuthContext } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { ITrip } from "@/types";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";

export default function ViajePage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const { token } = useAuthContext();
  const [viaje, setViaje] = useState<ITrip | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrip = async () => {
      if (id) {
        const trip = await getTripsById(id, token);
        setViaje(trip);
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id, token]);

  if (loading) return <Loading text="Cargando Viaje..." />;

  console.log("res:", viaje);

  const status = getTripStatus(viaje?.date);

  if (!viaje || !viaje.date) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar title="Viaje" />
        <NotFound text="Viaje no encontrado" />
      </div>
    );
  }

  return (
    <section>
      <Private />
      <Navbar title={`Viaje`} />
      <div className="mt-15">

        {
          status?.status !== 'past' 
          && 
          <>
        <LinkBlue text="Nuevo producto" href={`/viajes/${id}/nuevoProducto`} />
        <LinkBlue text="Nuevo proveedor" href={`/viajes/${id}/nuevoProveedor`} />
          </>
        }
        
        <LinkBlue text="Productos" href={`/viajes/${id}/productos`} />
        <LinkBlue text="Proveedores" href={`/viajes/${id}/proveedores`} />
        <LinkBlue text="Archivo" href={`/viajes/${id}/archivo`} />
        <LinkBlue text="Detalles de Viaje" href={`/viajes/${id}/detalles`} />
      </div>
    </section>
  );
}