import { ReactNode } from "react";

interface Tabs {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SidebarsettingsProps {
  data: Tabs[];
  onTabChange: (tabId: string) => void;
  activeTab: string;
}

export function SideBarSettings({
  data,
  onTabChange,
  activeTab,
}: SidebarsettingsProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <nav className="space-y-2">
          {data.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}