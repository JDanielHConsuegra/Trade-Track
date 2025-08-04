'use client';
import { useState, useEffect } from "react";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { IProduct } from "@/types";
import { getProducts } from "@/service/providerProducts";
import { ContainerProductDash } from "@/components/ContainerProductDash";
import { SearchDash } from "@/components/searchDash";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function ProductsPage() {
  const { modificacion } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProducts()
        if (Array.isArray(res)) {
          setLoading(false);
          setProductos(res)
        } 
        else setProductos([])
      }
      fetchProducts()
    }, [modificacion])

  if (loading) return <Loading text="Cargando Productos..." />;

  const filteredProducts = productos.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  || p.categoryMaster.toLowerCase().includes(searchTerm.toLowerCase())
  || p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  || p.trip?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Products:", filteredProducts);
  

  return (
    <section className="flex flex-col justify-start min-h-screen p-3">
      <Private />
      <h1 className="text-3xl font-bold text-center p-5 shadow-md bg-gray-50 mb-4">Filtra los productos, por nombre, categoría, referencia o viaje</h1>
      <SearchDash onSearch={setSearchTerm} />

      <div className="flex flex-col">
        {filteredProducts.length > 0 ? (
  <ContainerProductDash data={filteredProducts} />
) : (
  <NotFound text="No hay productos que coincidan con tu búsqueda." />
)}
      </div>
    </section>
  );
}