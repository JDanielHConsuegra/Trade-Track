'use client';
import { useEffect, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Navbar } from "@/components/navbar";
import { SearchBar } from "@/components/searchBar";
import { Pcontainer } from "@/components/Pcontainer";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { useParams } from "next/navigation";
import {  getProductsByUser } from "@/service/providerProducts";
import { IProduct } from "@/types";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function NuevoProductoPage() {
    const {user} = useAuthContext();
    const { status } = useParams();
  const items = ["Productos", "Aprobados", "Pendientes", "Cancelados"];
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProductsByUser(user?.id)
        if (Array.isArray(res)) setProductos(res)
        else setProductos([])
        setLoading(false);
      }
      fetchProducts()
    }, [user]);

    if (loading) {
      return <Loading text="Cargando productos..." />;
    }

    const statusMap: Record<string, string> = {
      Pendientes: "pending",
      Aprobados: "approved",
      Cancelados: "cancelled",
      Productos: "Productos"
    };

    const productosFiltrados =
      status === "Productos"
        ? productos
        : productos.filter(p => p.state === statusMap[status as string]);

  const productosBuscados = productosFiltrados.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col items-center justify-start min-h-screen p-3">
      <Private />
      <Navbar title={"Productos"} />
      <FilterBar items={items} href={`/productos/`} />
      <SearchBar onSearch={setSearchTerm} />

      <div className="w-full flex flex-col">
        {productosBuscados.length > 0 ? (
          productosBuscados.map((p, index) => (
            <Pcontainer key={index} data={[p]} />
          ))
        ) : (
          <NotFound text="No hay productos que coincidan con tu búsqueda." />
        )}
      </div>
    </section>
  );
}