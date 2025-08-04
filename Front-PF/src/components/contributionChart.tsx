"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyData {
  mes: string;
  proveedores: number;
  productos: number;
  usuarios?: number;
  viajes?: number;
}

interface ContributionChartProps {
  data: MonthlyData[];
}

export function ContributionChart({ data }: ContributionChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contribuciones por mes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="proveedores"
            stroke="#7e22ce"
            strokeWidth={3}
            name="Proveedores"
          />
          <Line
            type="monotone"
            dataKey="productos"
            stroke="#22c55e"
            strokeWidth={3}
            name="Productos"
          />
          {
            data[0] && data[0].usuarios !== undefined && (
              <Line
                type="monotone"
                dataKey="usuarios"
                stroke="#facc15"
                strokeWidth={3}
                name="Usuarios"
              />
            )
          }
          {
            data[0] && data[0].viajes !== undefined && (
              <Line
                type="monotone"
                dataKey="viajes"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Viajes"
              />
            )
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}