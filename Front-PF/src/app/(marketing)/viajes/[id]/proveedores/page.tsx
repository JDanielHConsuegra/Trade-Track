"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { LinkRed } from "@/components/linkRed";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { FaPlus } from 'react-icons/fa';
import { Prcontainer } from "@/components/Prcontainer";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { getTripsProviders } from "@/service/trips";
import { IProvider } from "@/types";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function NuevoProductoPage() {
  const items = ["Proveedores", "Ciudad"];
  const { id } = useParams();
  const { token } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [providersList, setProvidersList] = useState<IProvider[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getProviders = async (id: string) => {
      try {
        const res = await getTripsProviders(id, token);
        if (Array.isArray(res)){
          setProvidersList(res);
          setLoading(false);
        }
        else setProvidersList([]);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    getProviders(id as string);
  }, [id, token]);

  if (loading) return <Loading text="Cargando Proveedores..." />;
  // Filtrar proveedores por el nombre usando el SearchBar
  const proveedoresFiltrados = providersList.filter((p) =>
    p.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={`Proveedores del Viaje`} />
      <FilterBar items={items} href={`/viajes/${id}/proveedores/`} />
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex justify-start align-baseline w-full mr-5">
        <LinkRed text="Agregar Proveedor Nuevo" href={`/viajes/${id}/nuevoProveedor`} />
        <FaPlus className="ml-2 mt-5 text-4xl" />
      </div>
      {proveedoresFiltrados.length > 0 ? (
        proveedoresFiltrados.map((p, index) => (
          <Prcontainer key={index} data={[p]} />
        ))
      ) : (
        <NotFound text="No hay proveedores" />
      )}
    </section>
  );
}