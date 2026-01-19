'use client';
import React, { useState, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { Pcontainer } from "@/components/Pcontainer";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { IProduct } from "@/types";
import { getProductsByUser } from "@/service/providerProducts";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function NuevoProductoPage() {
  const items = ["Productos", "Aprobados", "Pendientes", "Cancelados"];
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true);


  const { user } = useAuthContext();


  useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProductsByUser(user?.id)
        if (Array.isArray(res)) setProductos(res)
          
        else setProductos([])
        setLoading(false);
      }
      fetchProducts()
    }, [user]);

  const filteredProducts = productos.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading text="Cargando productos..." />;
  }

  return (
      <section className="flex flex-col items-center justify-start min-h-screen p-3">
        <Private />
        <Navbar title={"Productos"} />
      <FilterBar items={items} href={`/productos/`} />
      <SearchBar onSearch={setSearchTerm} />

      <div className="w-full flex flex-col">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, index) => (
            <Pcontainer key={index} data={[p]} />
          ))
        ) : (
          <NotFound text="No hay productos que coincidan con tu búsqueda." />
        )}
      </div>
      </section>
  );
}