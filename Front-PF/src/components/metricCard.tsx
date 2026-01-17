import React, { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
  textColor?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  color = "bg-blue-100",
  textColor = "text-blue-700",
}: MetricCardProps): React.JSX.Element {
  return (
    <div
      className={`p-4 rounded-xl shadow-md flex items-center space-x-4 ${color} transform transition-all duration-200 ease-in-out
        hover:shadow-lg`}
    >
      <div className={`text-3xl md:text-4xl ${textColor}`}>{icon}</div>
      <div>
        <p className="text-sm md:text-base font-medium text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}