"use client";

import React from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#f32c29"];

interface ProductDataByState {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: ProductDataByState[];
  title: string;
}

export function DonutChart({ data, title }: DonutChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-xl shadow-md">
      <h2 className="text-xl text-center font-semibold mb-4">
        {title}
      </h2>

      <div className="relative w-full" style={{ height: 300, minHeight: 300 }}>
        {(!hasData) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500">No hay datos disponibles</p>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={hasData ? data : [{ name: "empty", value: 1 }]} // evita crash
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={hasData ? 5 : 0}
              dataKey="value"
              stroke="none"
              isAnimationActive={hasData}
              opacity={hasData ? 1 : 0} // oculta el “dummy”
              label={hasData ? true : false}
            >
              {(hasData ? data : [{ name: "empty", value: 1 }]).map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            {hasData && <Tooltip />}
            {hasData && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
