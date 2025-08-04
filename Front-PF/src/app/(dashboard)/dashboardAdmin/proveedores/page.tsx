'use client';
import { useState, useEffect } from "react";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import {  IProvider } from "@/types";
import {  getProviders } from "@/service/providerProducts";
import { SearchDash } from "@/components/searchDash";
import { ContainerProviderDash } from "@/components/ContainerProviderDash";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function ProvidersPage() {
  const { modificacion } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<IProvider[]>([])

  useEffect(() => {
      const fetchProviders = async () => {
        const res = await getProviders()
        if (Array.isArray(res)) {
          setProviders(res)
          setLoading(false)
        } else {
          setProviders([])
          setLoading(false)
        }
      }
      fetchProviders()
    }, [modificacion])

  if (loading) return <Loading text="Cargando Proveedores..." />;

  const filteredProviders = providers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  || p.wechat_contact?.toLowerCase().includes(searchTerm.toLowerCase())
  || p.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
  || p.address.toLowerCase().includes(searchTerm.toLowerCase())
  || p.city.toLowerCase().includes(searchTerm.toLowerCase())
  || p.master_genre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Providers:", filteredProviders);


  return (
    <section className="flex flex-col justify-start min-h-screen p-3">
      <Private />
      <h1 className="text-3xl font-bold text-center p-5 shadow-md bg-gray-50 mb-4">Filtra los proveedores, por nombre, WeChat, teléfono, dirección, ciudad o género principal</h1>
      <SearchDash onSearch={setSearchTerm} />

      <div className="flex flex-col">
        {filteredProviders.length > 0 ? (
  <ContainerProviderDash data={filteredProviders} />
) : (
  <NotFound text="No hay proveedores que coincidan con tu búsqueda." />
)}
      </div>
    </section>
  );
}