"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es } from "date-fns/locale";
import { useState } from "react";
import { ITrip } from "@/types";

const locales = { es };

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  originalTrip: ITrip;
}

const adaptTripsToEvents = (trips: ITrip[]): CalendarEvent[] =>
  trips.map((trip) => ({
    title: trip.name,
    start: new Date(trip.date),
    end: new Date(trip.date),
    originalTrip: trip,
  }));

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  eventos: ITrip[];
}

export function CalendarView({ eventos }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const eventosAdaptados = adaptTripsToEvents(eventos);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const irAlMes = (mesIndex: number) => {
    const nuevaFecha = new Date(currentDate.getFullYear(), mesIndex, 1);
    setCurrentDate(nuevaFecha);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-300 flex flex-col space-y-6">
      <h2 className="text-3xl text-center font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded border-b-2 w-fit mx-auto mb-2">
        Calendario de Viajes
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        {meses.map((mes, i) => (
          <button
            key={mes}
            onClick={() => irAlMes(i)}
            className={`px-3 py-1 text-sm rounded border transition-all duration-150 ${
              currentDate.getMonth() === i
                ? "bg-indigo-600 text-white font-semibold"
                : "bg-gray-100 hover:bg-indigo-100"
            }`}
          >
            {mes}
          </button>
        ))}
      </div>

      <div className="h-[500px]">
        <Calendar
          localizer={localizer}
          events={eventosAdaptados}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          defaultView="month"
          culture="es"
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          messages={{
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
          }}
          components={{
            event: ({ event }) => {
              const { originalTrip } = event;
              return (
                <div className="bg-blue-600 text-white rounded-md px-2 py-1 text-xs shadow hover:bg-blue-700 transition duration-200">
                  <div className="font-semibold truncate">
                    {originalTrip.name}
                  </div>
                  {originalTrip.products?.length > 0 && (
                    <div className="text-[10px] mt-1">
                      🛒 {originalTrip.products?.map((p) => p.name).join(", ")}
                    </div>
                  )}
                  {originalTrip.providers?.length > 0 && (
                    <div className="text-[10px]">
                      🤝 {originalTrip.providers?.map((p) => p.name).join(", ")}
                    </div>
                  )}
                </div>
              );
            },
          }}
          popup={true}
          popupOffset={30}
          eventPropGetter={(event) => {
            const cancelled =
              Array.isArray(event.originalTrip.products) &&
              event.originalTrip.products.some((p) => p.state === "cancelled");
            return {
              className: cancelled
                ? "bg-red-600 text-white"
                : "bg-indigo-600 text-white",
            };
          }}
          dayPropGetter={(date) => {
            const isWeekend = [0, 6].includes(date.getDay());
            return {
              className: isWeekend
                ? "hover:bg-yellow-100 transition-all ease-in-out duration-150"
                : "hover:bg-indigo-100 transition-all ease-in-out duration-150",
            };
          }}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}