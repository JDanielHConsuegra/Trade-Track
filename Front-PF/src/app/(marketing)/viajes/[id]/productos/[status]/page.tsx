"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { LinkRed } from "@/components/linkRed";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { FaPlus } from 'react-icons/fa';
import { Pcontainer } from "@/components/Pcontainer";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { useAuthContext } from "@/context/authContext";
import { IProduct } from "@/types";
import { getTripsProducts } from "@/service/trips";
import { Loading } from "@/components/loading";

export default function NuevoProductoPage() {
  const { id, status } = useParams();
  const { token } = useAuthContext();
  const items = ["Productos", "Aprobados", "Pendientes", "Cancelados"];

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<IProduct[]>([]);

    useEffect(() => {
      async function fetchProducts() {
        if (typeof id === "string") {
          const result = await getTripsProducts(id, token);
          if (Array.isArray(result)) {
            setProductos(result);
            setLoading(false);
          } else {
            setProductos([]);
          }
        } else {
          setProductos([]);
        }
      }
      fetchProducts();
    }, [id, token]);

  if (loading) return <Loading text="Cargando productos..." />;

  // Primero filtramos por status
  // Mapeo de status en español a inglés para la filtración
  const statusMap: Record<string, string> = {
    "Productos": "Productos",
    "Aprobados": "approved",
    "Pendientes": "pending",
    "Cancelados": "cancelled",
  };

  const productosFiltradosPorStatus =
    status === "Productos"
      ? productos
      : productos.filter((p) => p.state === statusMap[status as string]);

  // Luego filtramos por el término de búsqueda
  const productosFinales = productosFiltradosPorStatus.filter((p) =>
    p.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={`Productos Viaje`} />
      <FilterBar items={items} href={`/viajes/${id}/productos/`} />
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex justify-start align-baseline w-full mr-5">
        <LinkRed text="Agregar Producto Nuevo" href={`/viajes/${id}/nuevoProducto`} />
        <FaPlus className="ml-2 mt-5 text-4xl" />
      </div>
      <div className="w-full flex flex-col">
        {productosFinales.length > 0 ? (
          productosFinales.map((p, index) => (
            <Pcontainer key={index} data={[p]} />
          ))
        ) : (
          <NotFound text="No hay productos disponibles para este viaje." />
        )}
      </div>
    </section>
  );
}