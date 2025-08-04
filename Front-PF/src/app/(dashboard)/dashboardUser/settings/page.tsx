"use client";
import { useState } from "react";
import { SideBarSettings } from "@/components/settings/sideBarSettings";
import { NotificationsView } from "@/components/settings/notificationsView";
import { NotificationSettings } from "@/types";
import { SecurityView } from "@/components/settings/securityView";
import { DataView } from "@/components/settings/dataView";
import { FaSmileWink } from 'react-icons/fa';
import { GiMatterStates } from 'react-icons/gi';
import { FaExchangeAlt } from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("notifications");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    monthlyReports: true,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "notifications", label: "Beneficios", icon: <FaSmileWink /> },
    { id: "security", label: "Estado de tu Suscripción", icon: <GiMatterStates /> },
    { id: "data", label: "Modificar tu Suscripción", icon: <FaExchangeAlt /> },
  ];

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <div className="mb-8">
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <SideBarSettings
            data={tabs}
            onTabChange={setActiveTab}
            activeTab={activeTab}
          />

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Notificaciones */}
              {activeTab === "notifications" && (
                <NotificationsView
                  notifications={notifications} // Pasa el estado de notificaciones
                  onToggle={handleNotificationToggle} // Pasa la función para alternar notificaciones
                />
              )}

              {/* Seguridad */}
              {activeTab === "security" && (
                <SecurityView
                  showCurrentPassword={showCurrentPassword}
                  passwords={passwords}
                  handlePasswordChange={handlePasswordChange}
                  setShowCurrentPassword={setShowCurrentPassword}
                  setShowNewPassword={setShowNewPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  showNewPassword={showNewPassword}
                  showConfirmPassword={showConfirmPassword}
                />
              )}

              {/* Gestión de datos */}
              {activeTab === "data" && <DataView />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}