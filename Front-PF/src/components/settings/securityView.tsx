import { FaEyeSlash, FaEye } from "react-icons/fa";

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecurityViewProps {
  showCurrentPassword: boolean;
  passwords: Passwords;
  handlePasswordChange: (field: string, value: string) => void;
  setShowCurrentPassword: (value: boolean) => void;
  setShowNewPassword: (value: boolean) => void;
  setShowConfirmPassword: (value: boolean) => void;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
}

export function SecurityView({
  showCurrentPassword,
  passwords,
  handlePasswordChange,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword,
  showNewPassword,
  showConfirmPassword,
}: SecurityViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Seguridad</h2>

      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">
          Cambiar contraseña
        </h3>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña actual
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              value={passwords.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={passwords.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}