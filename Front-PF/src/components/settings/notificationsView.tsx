import { NotificationSettings } from "@/types";
import { ToggleSwitch } from "./toggleSwitch";
import React from "react";

interface NotificationSettingsProps {
  notifications: NotificationSettings;
  onToggle: (key: keyof NotificationSettings) => void;
}

export function NotificationsView({
  notifications,
  onToggle,
}: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Notificaciones</h2>

      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">
          Canales de notificación
        </h3>

        {[
          {
            key: "emailNotifications",
            label: "Notificaciones por email",
            desc: "Recibir notificaciones en tu correo",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                {item.label}
              </label>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ToggleSwitch
              checked={
                notifications[item.key as keyof NotificationSettings] as boolean
              }
              onChange={() => onToggle(item.key as keyof NotificationSettings)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">
          Tipos de notificaciones
        </h3>

        {[
          {
            key: "monthlyReports",
            label: "Reportes mensuales",
            desc: "Resumen mensual de métricas",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">
                {item.label}
              </label>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <ToggleSwitch
              checked={
                notifications[item.key as keyof NotificationSettings] as boolean
              }
              onChange={() => onToggle(item.key as keyof NotificationSettings)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}