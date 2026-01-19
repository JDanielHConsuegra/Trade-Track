"use client";
import { ContributionChart } from "@/components/contributionChart";
import { DonutChart } from "@/components/donutChart";
import { UserStatsSection } from "@/components/profile/userStatsSection";
import { IProduct, IProvider, ITrip } from "@/types";
import { useAuthContext } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { getTrips } from "@/service/trips";
import { getProductsByUser, getProvidersByUser } from "@/service/providerProducts";


export default function DashboardPage() {
  const { user, token } = useAuthContext();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [proveedores, setProvidersList] = useState<IProvider[]>([])
  const [products, setProducts] = useState<IProduct[]>([]);
  
useEffect(() => {
        const fetchTrips = async () => {
            if (user && token) {
                const data = await getTrips(user.id, token);
                setTrips(Array.isArray(data) ? data : []);
            }
        };
        fetchTrips();
    }, [user, token]);

useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProductsByUser(user?.id)
        if (Array.isArray(res)) setProducts(res)
        else setProducts([])
      }
      fetchProducts()
    }, [user]);

useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProvidersByUser(user?.id)
      if (res) setProvidersList(res)
      else setProvidersList([])
    }
    fetchProviders()
  }, [user])


const meses = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];


const datosMensuales = meses.slice(0, 12).map((mes, idx) => {
  const proveedoresMes = proveedores.filter(
    p => {
      const date = p.created_at ? new Date(p.created_at) : null;
      return date && !isNaN(date.getTime()) && date.getMonth() === idx;
    }
  ).length;
  const productosMes = products.filter(
    p => {
      const date = p.created_at ? new Date(p.created_at) : null;
      return date && !isNaN(date.getTime()) && date.getMonth() === idx;
    }
  ).length;
  const viajesMes = trips.filter(
    v => {
      const date = v.date ? new Date(v.date) : null;
      return date && !isNaN(date.getTime()) && date.getMonth() === idx;
    }
  ).length;
  return {
    mes,
    proveedores: proveedoresMes,
    productos: productosMes,
    viajes: viajesMes,
  };
});

const datosProductosPorEstado = Array.from(
  products.reduce((acc, product) => {
    const estado = product.state || "Otros";
    acc.set(estado, (acc.get(estado) || 0) + 1);
    return acc;
  }, new Map<string, number>())
).map(([name, value]) => ({ name, value }));


const datosProveedoresPorCiudad = Array.from(
  proveedores.reduce((acc, prov) => {
    const ciudad = prov.city || "Otras";
    acc.set(ciudad, (acc.get(ciudad) || 0) + 1);
    return acc;
  }, new Map<string, number>())
).map(([name, value]) => ({ name, value }));

const userStats = {
  totalProveedores: proveedores.length,
  totalProductos: products.length,
  totalViajes: trips.length,
};

  return (
      <div className="flex min-h-screen">
        <main className="flex-1 p-8">
          <UserStatsSection userStats={userStats} />
          <div className="mb-8">
            <ContributionChart data={datosMensuales} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  mb-8">
            <DonutChart
              data={datosProductosPorEstado}
              title="Productos por Estatus"
            />
            <DonutChart
              data={datosProveedoresPorCiudad}
              title="Proveedores por Ciudad de Origen"
            />
          </div>
        </main>
      </div>
  );
}