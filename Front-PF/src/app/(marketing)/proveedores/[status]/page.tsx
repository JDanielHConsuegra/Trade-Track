'use client';
import { useEffect, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { Prcontainer } from "@/components/Prcontainer";
import { NotFound } from "@/components/notFound";
import { IProvider } from "@/types";
import { Private } from "@/components/Private";
import { useParams } from "next/navigation";
import { getProvidersByUser } from "@/service/providerProducts";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function ProveedoresidPage() {
  const { status } = useParams<{ status: string }>();
  const items = ["Proveedores", "Ciudad"];
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<IProvider[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProvidersByUser(user?.id);
        if (res) setProviders(res);
        else setProviders([]);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [user]);

  if (loading) return <Loading text="Cargando proveedores..." />;

  // Filtrar proveedores según búsqueda
  
  const filteredProviders = providers.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agrupar los filtrados por ciudad
  const groupedProviders = filteredProviders.reduce<Record<string, IProvider[]>>((acc, provider) => {
    if (!acc[provider.city]) {
      acc[provider.city] = [];
    }
    (acc[provider.city] ?? []).push(provider);
    return acc;
  }, {});

  console.log(status + "lolololo");
  

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={`Provedores`} />
      <FilterBar items={items} href={`/proveedores/`} />
      <SearchBar onSearch={setSearchTerm} />

      {status === "Ciudad"
        ? Object.entries(groupedProviders).map(([city, group]) => (
            <div key={city} className="w-full mt-8">
              <h2 className="text-xl p-3 w-fit rounded bg-gray-100 m-auto text-center font-bold hover:bg-gray-200 cursor-pointer">
                {city}
              </h2>
              {group.map((p, index) => (
                <Prcontainer key={index} data={[p]} />
              ))}
            </div>
          ))
        : filteredProviders.map((p, index) => (
            <Prcontainer key={index} data={[p]} />
          ))}

      {filteredProviders.length === 0 && <NotFound text="No hay proveedores que coincidan" />}
    </section>
  );
}