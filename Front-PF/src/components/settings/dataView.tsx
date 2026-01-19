import { FaRing, FaTrash } from "react-icons/fa";
import React from "react";

export function DataView({}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Gestión de Datos</h2>

      <div className="space-y-4">
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-700 flex items-center gap-2">
                <FaRing className="w-4 h-4" />
                Eliminar cuenta
              </h3>
              <p className="text-xs text-red-600">
                Esta acción no se puede deshacer
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <FaTrash className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}