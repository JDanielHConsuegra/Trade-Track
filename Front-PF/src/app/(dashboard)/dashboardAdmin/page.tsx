"use client";
import { ContributionChart } from "@/components/contributionChart";
import { DonutChart } from "@/components/donutChart";
import { UserStatsSection } from "@/components/profile/userStatsSection";
import { IProduct, IProvider, ITrip, IUser, ProductState } from "@/types";
import { useAuthContext } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { getAllTrips } from "@/service/trips";
import { getProducts, getProviders } from "@/service/providerProducts";
import { GetUser } from "@/service/user";


export default function DashboardPage() {
  const { user, token } = useAuthContext();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [proveedores, setProvidersList] = useState<IProvider[]>([])
  const [products, setProductos] = useState<IProduct[]>([])
  const [users, setUsers] = useState<IUser[]>([])


  useEffect(() => {
        const fetchUsers = async () => {
            if (user && token) {
                const data = await GetUser();
                setUsers(Array.isArray(data.users) ? data.users : []);
            }
        };
        fetchUsers();
    }, [user, token]);
  
useEffect(() => {
        const fetchTrips = async () => {
            if (user && token) {
                const data = await getAllTrips( token);
                setTrips(Array.isArray(data) ? data : []);
            }
        };
        fetchTrips();
    }, [user, token]);

useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProducts()
        if (Array.isArray(res)) setProductos(res)
        else setProductos([])
      }
      fetchProducts()
    }, [])

useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      if (res) setProvidersList(res)
      else setProvidersList([])
    }
    fetchProviders()
  }, [])


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
    const usuariosMes = users.filter(
        u => {
            const date = u.created_at ? new Date(u.created_at) : null;
            return date && !isNaN(date.getTime()) && date.getMonth() === idx;
        }
    ).length;
    const viajesMes = trips.filter(
        t => {
            const date = t.createdAt ? new Date(t.createdAt) : null;
            return date && !isNaN(date.getTime()) && date.getMonth() === idx;
        }
    ).length;
    return {
        mes,
        proveedores: proveedoresMes,
        productos: productosMes,
        usuarios: usuariosMes,
        viajes: viajesMes,
    };
});

const datosUsuarios = Array.from(
  users.reduce((acc, user) => {
    const role = user.admin ? "Admin" : "Usuarios";
    acc.set(role, (acc.get(role) || 0) + 1);
    return acc;
  }, new Map<string, number>())
).map(([name, value]) => ({ name, value }));

const estadoLabelMap: Record<ProductState, string> = {
  [ProductState.APPROVED]: "Aprobados",
  [ProductState.PENDING]: "Pendientes",
  [ProductState.CANCELLED]: "Cancelados",
};

const datosProductosPorEstado = Array.from(
  products.reduce((acc, product) => {
    const label = estadoLabelMap[product.state] ?? "Otros";
    acc.set(label, (acc.get(label) || 0) + 1);
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
  totalUsuarios: users.length,
};

console.log("userStats", users);


  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <div className="mb-8">
        </div>
        <UserStatsSection userStats={userStats} />
        <div className="mb-8">
          <ContributionChart data={datosMensuales} />
        </div>

        <div className="m-10 flex flex-wrap justify-between gap-6">
          <DonutChart
            data={datosProductosPorEstado}
            title="Productos por Estatus"
          />
          <DonutChart
            data={datosProveedoresPorCiudad}
            title="Proveedores por Ciudad de Origen"
          />
          <DonutChart
            data={datosUsuarios}
            title="Usuarios Segun Rol"
          />
        </div>
      </main>
    </div>
  );
}