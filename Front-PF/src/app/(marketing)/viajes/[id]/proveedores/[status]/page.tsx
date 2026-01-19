"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { LinkRed } from "@/components/linkRed";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { FaPlus } from 'react-icons/fa';
import { Prcontainer } from "@/components/Prcontainer";
import { NotFound } from "@/components/notFound";
import { IProvider } from "@/types";
import { Private } from "@/components/Private";
import { getTripsProviders } from "@/service/trips";
import { useAuthContext } from "@/context/authContext";

export default function NuevoProductoPage() {
  const { id, status } = useParams();
  const { token } = useAuthContext();
  const items = ["Proveedores", "Ciudad"];

  const [searchTerm, setSearchTerm] = useState("");
  const [providersList, setProvidersList] = useState<IProvider[]>([]);

  useEffect(() => {
      const getProviders = async (id: string) => {
        try {
          const res = await getTripsProviders(id, token);
          if (Array.isArray(res)){
            setProvidersList(res);
          }
          else setProvidersList([]);
        } catch (error) {
          console.error("Error fetching providers:", error);
        }
      };
      getProviders(id as string);
    }, [id, token]);
  // Filtramos los proveedores por término de búsqueda
  const proveedoresFiltrados = providersList.filter((p) =>
    p.name?.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
    p.city?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Agrupamos los proveedores filtrados por ciudad
  const groupedProviders = proveedoresFiltrados.reduce<Record<string, IProvider[]>>((acc, provider) => {
    if (!provider.city) return acc;
    if (!acc[provider.city]) acc[provider.city] = [];
    acc[provider.city]?.push(provider);
    return acc;
  }, {});

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={`Proveedores Viaje`} />
      <FilterBar items={items} href={`/viajes/${id}/proveedores/`} />
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex justify-start align-baseline w-full mr-5">
        <LinkRed text="Agregar Proveedor Nuevo" href={`/viajes/${id}/nuevoProveedor`} />
        <FaPlus className="ml-2 mt-5 text-4xl" />
      </div>

      {status === "Ciudad" ? (
        Object.entries(groupedProviders).map(([city, group]) => (
          <div key={city} className="w-full mt-8">
            <h2 className="text-xl p-3 w-fit rounded bg-gray-100 m-auto text-center font-bold hover:bg-gray-200 cursor-pointer">
              {city}
            </h2>
            {group.map((p, index) => (
              <Prcontainer key={index} data={[p]} />
            ))}
          </div>
        ))
      ) : (
        proveedoresFiltrados.map((p, index) => (
          <Prcontainer key={index} data={[p]} />
        ))
      )}

      {proveedoresFiltrados.length === 0 && <NotFound text="No hay proveedores" />}
    </section>
  );
}