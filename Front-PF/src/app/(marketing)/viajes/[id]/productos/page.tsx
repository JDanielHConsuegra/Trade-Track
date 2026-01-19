"use client";

import { FilterBar } from "@/components/FilterBar";
import { LinkRed } from "@/components/linkRed";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { FaPlus } from 'react-icons/fa';
import { Pcontainer } from "@/components/Pcontainer";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IProduct } from "@/types";
import { getTripsProducts } from "@/service/trips";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";


export default function NuevoProductoPage() {
    const { id } = useParams();
    const { token } = useAuthContext();
  const items = ["Productos", "Aprobados", "Pendientes", "Cancelados"];
  const [productos, setProductos] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products when component mounts or id changes
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

  // Filtra los productos usando el término de búsqueda
  const filteredProductos = productos.filter((p) =>
    p.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  console.log("total productos", productos);
  
  console.log("Filtered Products:", filteredProductos);
  
  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={"Productos"} />
      <FilterBar items={items} href={`/viajes/${id}/productos/`} />
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex justify-start align-baseline w-full mr-5">
        <LinkRed text="Agregar Producto Nuevo" href={`/viajes/${id}/nuevoProducto`} />
        <FaPlus className="ml-2 mt-5 text-4xl" />
      </div>
      <div className="w-full flex flex-col">
        {filteredProductos?.length > 0 ? (
          filteredProductos.map((p, index) => (
            <Pcontainer key={index} data={[p]} />
          ))
        ) : (
          <NotFound text="No hay productos disponibles para este viaje." />
        )}
      </div>
    </section>
  );
}