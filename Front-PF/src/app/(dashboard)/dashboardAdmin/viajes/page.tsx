'use client';
import React, { useState, useEffect } from "react";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import {  ITrip } from "@/types";
import { SearchDash } from "@/components/searchDash";
import { getAllTrips } from "@/service/trips";
import { useAuthContext } from "@/context/authContext";
import { ContainerTripDash } from "@/components/ContainerTripDash";
import { Loading } from "@/components/loading";

export default function ProductsPage() {
  const { token, modificacion } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState<ITrip[]>([])
  const [loading, setLoading] = useState(true);

useEffect(() => {
        const fetchTrips = async () => {
            if (token) {
                const data = await getAllTrips( token);
                setLoading(false);
                setTrips(Array.isArray(data) ? data : []);
            }
        };
        fetchTrips();
    }, [ token, modificacion]);
  console.log("Trips:", trips);

  if (loading) return <Loading text="Cargando Viajes..." />;

  const filteredTrips = trips.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <section className="flex flex-col justify-start min-h-screen p-3">
      <Private />
      <h1 className="text-3xl font-bold text-center p-5 shadow-md bg-gray-50 mb-4">Filtra los Viajes, por nombre</h1>
      <SearchDash onSearch={setSearchTerm} />

      <div className="flex flex-col">
        {filteredTrips.length > 0 ? (
  <ContainerTripDash data={filteredTrips} />
) : (
  <NotFound text="No hay viajes que coincidan con tu búsqueda." />
)}
      </div>
    </section>
  );
}