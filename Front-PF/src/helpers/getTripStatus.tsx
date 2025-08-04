// utils/getTripStatus.ts
import { MdEmergency } from 'react-icons/md'
import { FaPlane, FaPlaneSlash } from 'react-icons/fa'

export type TripStatus = 'past' | 'today' | 'future'

export function getTripStatus(
  date?: Date,
  iconSize: "small" | "large" = "large"
): {
  status: TripStatus;
  diffDays: number;
  icon: React.ReactElement;
  title: string;
} | null {
  if (!date) return null;

  const iconClass = iconSize === "large" ? "text-8xl mb-4" : "text-3xl mb-2";

  const today = new Date();
  const trip = new Date(date);

  trip.setDate(trip.getDate() + 2);

  console.log(`Calculating trip status for date: ${trip.toISOString()} against today: ${today.toISOString()}`);
  


  // Normalizamos ambos
  const todayNormalized = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const tripNormalized = new Date(
    trip.getFullYear(),
    trip.getMonth(),
    trip.getDate()
  );

  const diffMs = tripNormalized.getTime() - todayNormalized.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: "past",
      diffDays,
      icon: <FaPlaneSlash className={`text-blue-300 ${iconClass}`} />,
      title: "Inactivo",
    };
  } else if (diffDays === 0) {
    return {
      status: "today",
      diffDays,
      icon: <MdEmergency className={`text-red-600 ${iconClass}`} />,
      title: "Activo (Hoy)",
    };
  } else {
    return {
      status: "future",
      diffDays,
      icon: <FaPlane className={`text-green-600 ${iconClass}`} />,
      title: "Activo",
    };
  }
}