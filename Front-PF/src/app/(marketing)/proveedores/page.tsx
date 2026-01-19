"use client"

import React, { useState, useEffect } from "react"
import { FilterBar } from "@/components/FilterBar"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/searchBar"
import { Prcontainer } from "@/components/Prcontainer"
import { NotFound } from "@/components/notFound"
import { Private } from "@/components/Private"
import { IProvider } from "@/types"
import {  getProvidersByUser } from "@/service/providerProducts"
import { useAuthContext } from "@/context/authContext"
import { Loading } from "@/components/loading"
 
export default function ProveedoresPage() {
  const { user } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [providersList, setProvidersList] = useState<IProvider[]>([])
  const items = ["Proveedores", "Ciudad"]

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProvidersByUser(user?.id)
      if (res) setProvidersList(res)
      else setProvidersList([])
      setLoading(false)
    }
    fetchProviders()
  }, [user]) 

  if (loading) return <Loading text="Cargando proveedores..." />

  const proveedoresFiltrados = providersList.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
      <section className="flex flex-col items-center justify-start min-h-screen p-3">
        <Private />
        <Navbar title="Proveedores" />
      <FilterBar items={items} href="/proveedores/" />
      <SearchBar onSearch={setSearchTerm} />
      {proveedoresFiltrados.length > 0 ? (
        proveedoresFiltrados.map((p, index) => (
          <Prcontainer key={p.id || index} data={[p]} />
        ))
      ) : (
        <NotFound text="No hay proveedores" />
      )}
      </section>
  )
}