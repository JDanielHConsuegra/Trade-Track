interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}