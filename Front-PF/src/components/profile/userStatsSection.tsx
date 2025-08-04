"use client";

import { MetricCard } from "@/components/metricCard";
import { FaIndustry, FaProductHunt, FaPlane } from "react-icons/fa";
import { useAuthContext } from "@/context/authContext";
import { FaUser } from 'react-icons/fa';

interface UserStats {
  totalProveedores: number;
  totalProductos: number;
  totalViajes: number;
  totalUsuarios?: number; // Optional if you want to include it only for admin users
}

interface UserStatsSectionProps {
  userStats: UserStats;
}

export function UserStatsSection({ userStats }: UserStatsSectionProps) {
  const { user } = useAuthContext();
  return (
    <div className="p-6 flex flex-wrap gap-6 justify-center">
      <MetricCard
        title="Total Proveedores"
        value={userStats.totalProveedores || 0}
        icon={<FaIndustry />}
        color="bg-purple-100"
        textColor="text-purple-700"
      />
      <MetricCard
        title="Total Productos"
        value={userStats.totalProductos || 0}
        icon={<FaProductHunt />}
        color="bg-blue-100"
        textColor="text-blue-700"
      />
      <MetricCard
        title="Total Viajes"
        value={userStats.totalViajes || 0}
        icon={<FaPlane />}
        color="bg-green-100"
        textColor="text-green-700"
      />
      {
        user?.admin && (
          <MetricCard
            title="Total Usuarios"
            value={userStats.totalUsuarios || 0}
            icon={<FaUser />}
            color="bg-yellow-100"
            textColor="text-yellow-700"
          />
        )
      }
    </div>
  );
}