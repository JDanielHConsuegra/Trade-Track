"use client"
// app/(private)/nuevo-producto/[id]/page.tsx
import { Navbar } from "@/components/navbar"
import { NotFound } from "@/components/notFound"
import { Private } from "@/components/Private"
import { getTripsById } from "@/service/trips"
import { ITrip } from "@/types"
import { getTripStatus } from "@/helpers/getTripStatus"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useAuthContext } from "@/context/authContext"

export default function NuevoProductoPage() {
  const { id } = useParams()
  const { token } = useAuthContext()
  const [trip, setTrip] = useState<ITrip | null>(null)

  useEffect(() => {
    const fetchTrip = async () => {
      if (id && typeof id === "string") {
        const trip = await getTripsById(id, token);
        setTrip(trip);
      }
    };
    fetchTrip();
  }, [id, token]);

  if (!trip?.date) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar title="Detalles Producto" />
        <NotFound text="Viaje no encontrado" />
      </div>
    )
  }

  const tripStatus = getTripStatus(trip?.date)
  const tripDate = new Date(trip?.date)

  tripDate.setDate(tripDate.getDate() + 2);

   // Aseguramos que la fecha del viaje esté normalizada
  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title="Detalles del viaje" />
      <div className="w-full max-w-80 p-10 bg-gray-100 rounded-lg shadow-md mt-10 flex flex-col justify-center items-center">
        {tripStatus && tripStatus.icon}
        <h2 className="text-red-600 font-bold mb-10">{tripStatus && tripStatus.title}</h2>

        {tripStatus && tripStatus.status === 'past' && (
          <p className="self-start">El viaje fue hace <b>{Math.abs(tripStatus.diffDays)} día{Math.abs(tripStatus.diffDays) === 1 ? '' : 's'}</b></p>
        )}
        {tripStatus && tripStatus.status === 'today' && (
          <p className="text-2xl mb-2">El viaje es <b>HOY</b></p>
        )}
        {tripStatus && tripStatus.status === 'future' && (
          <p className="self-start">Días faltantes: <b>{tripStatus.diffDays}</b></p>
        )}

        <p className="self-start mb-5">Fecha del viaje: <b>{tripDate.toLocaleDateString()}</b></p>

        <p className="font-bold self-start">Detalles:</p>
        <hr className="w-full" />

        {(trip.products ?? []).length > 0 ? (
          <p>- El viaje llevó un total de: <b>{(trip.products ?? []).length}</b> productos</p>
        ) : (
          <p>- No se registraron productos para este viaje.</p>
        )}

        {(trip.providers ?? []).length > 0 ? (
          <p>- El viaje tuvo un total de: <b>{(trip.providers ?? []).length}</b> proveedores</p>
        ) : (
          <p>- No se registraron proveedores para este viaje.</p>
        )}

        <p className="font-bold mt-5 self-start">Pasajeros:</p>
        <hr className="w-full" />

        <div className="flex justify-start gap-4 flex-wrap">
          {(trip.travelers ?? []).length > 0 ? (
            (trip.travelers ?? []).map((t, index) => (
              <span key={index} className="mt-2 p-2 bg-white font-bold rounded border-red-200 border">
                {t.toLocaleUpperCase()}
              </span>
            ))
          ) : (
            <p>- No se registraron viajeros para este viaje.</p>
          )}
        </div>
      </div>
    </section>
  )
}