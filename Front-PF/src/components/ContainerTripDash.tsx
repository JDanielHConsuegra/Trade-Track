import { ICreateTrip, ITrip } from "@/types";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/authContext";
import { putTripsById } from "@/service/trips";
import { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/dist/client/link";

interface IProps {
  data: ITrip[];
}

export const ContainerTripDash: React.FC<IProps> = ({ data }) => {
  const { token, toggleModificacion } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState<ITrip | null>(null);

  const toggleProductStatus = async (values: ITrip) => {
    console.log("Valores del viaje: ", values);

    const valores: ICreateTrip = {
      name: values.name,
      date: values.date instanceof Date ? values.date.toISOString() : values.date,
      travelers: values.travelers,
      observation: values.observation,
    };

    try {
      const res = await putTripsById(values.id, token, valores);
      console.log("Respuesta de la API: ", res);

      if (res?.message === "Viaje actualizado exitosamente") {
        toast.success(`Viaje ${res.trip.name} actualizado exitosamente`);
        toggleModificacion()
        return;
      }
      if (res?.message === "Error en los datos enviados") {
        toast.error("Error en los datos enviados");
        return;
      }
      if (res?.message === "Error al conectar con el servidor:") {
        toast.error("Error al conectar con el servidor");
        return;
      }
    } catch (error) {
      toast.error("Error al desactivar el viaje");
      console.error("Error al desactivar el viaje:", error);
    }
  };

  return (
    <section className="w-full m-auto rounded mt-3">
      <div className="overflow-x-auto w-full">
      <table className="w-fit m-auto table-auto bg-gray-200 border-2 shadow-md rounded-lg">
        <thead className="bg-blue-800 text-white">
        <tr className="*:text-center">
          <th className="px-4 py-3">Nombre</th>
          <th className="px-4 py-3">Fecha</th>
          <th className="px-4 py-3">Total Pasajeros</th>
          <th className="px-4 py-3">Fecha de Creacion</th>
          <th className="px-4 py-3">Observacion</th>
          <th className="text-left px-4 py-3">Acción</th>
          <th className="text-left px-4 py-3">Detalles</th>
        </tr>
        </thead>
        <tbody>
        {data.map((trip, index) => (
          <tr
          key={index}
          className="border-b *:text-center hover:bg-blue-50 transition duration-200"
          >
          <td className="px-4 py-3 font-semibold">{trip.name}</td>
          <td className="px-4 py-3">
            {trip.date instanceof Date
            ? trip.date.toLocaleDateString()
            : trip.date}
          </td>
          <td className="px-4 py-3 font-bold">
            {trip.travelers ? trip.travelers.length : 0}
          </td>
          <td className="px-4 py-3">
            {trip.createdAt
            ? (() => {
              const date =
                trip.createdAt instanceof Date
                ? trip.createdAt
                : new Date(trip.createdAt);
              return `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(
                2,
                "0"
              )}`;
              })()
            : ""}
          </td>
          <td className="px-4 py-3">
            {trip.observation ?? "Sin observación"}
          </td>
          <td className="px-4 py-3">
            <button
            onClick={() => {
              setTripToEdit(trip);
              setModalOpen(true);
            }}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
            >
            Modificar
            </button>
          </td>
          <td className="px-4 py-3">
            <Link className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200" href={`/viajes/${trip.id}/detalles`}>
              Ver
            </Link>
          </td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>

      {modalOpen && tripToEdit && (
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-xs z-50">
        <div className="bg-white border-2 p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Modificar Viaje</h2>

        <Formik
          initialValues={{
          name: tripToEdit.name,
          date:
            tripToEdit.date instanceof Date
            ? tripToEdit.date.toISOString().substring(0, 10)
            : typeof tripToEdit.date === "string"
            ? (tripToEdit.date as string).substring(0, 10)
            : "",
          travelers: tripToEdit.travelers,
          observation: tripToEdit.observation ?? "",
          }}
          validationSchema={Yup.object({
          name: Yup.string().required("Nombre requerido"),
          date: Yup.date().required("Fecha requerida"),
          observation: Yup.string(),
          })}
          onSubmit={(values) => {
          toggleProductStatus({
            ...tripToEdit,
            ...values,
            date: new Date(values.date),
          });
          setModalOpen(false);
          }}
        >
          {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block font-semibold" htmlFor="name">Nombre</label>
            <Field
              name="name"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
            <label className="block font-semibold" htmlFor="date">Fecha</label>
            <Field
              name="date"
              type="date"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage name="date" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
            <label className="block font-semibold" htmlFor="observation">Observación</label>
            <Field
              as="textarea"
              name="observation"
              className="border p-2 w-full rounded"
            />
            </div>

            <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-blue-950 font-bold text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Modificar
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            </div>
          </form>
          )}
        </Formik>
        </div>
      </div>
      )}
    </section>
  );
};