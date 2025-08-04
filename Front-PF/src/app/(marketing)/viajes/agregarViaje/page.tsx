//JUAN JOSE
"use client";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ButtonRed } from "@/components/buttonRed";
import { Navbar } from "@/components/navbar";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Private } from "@/components/Private";
import { ICreateTrip } from "@/types";
import { createTrip } from "@/service/trips";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

export default function ViajesForm() {
  const router = useRouter();
  const { user, token } = useAuthContext();
  const initialValues: ICreateTrip = {
    name: "",
    date: "",
    travelers: [""],
    observation: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    date: Yup.string()
      .required("Selecciona la fecha")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
      // .test(
      //   "is-future-date",
      //   "La fecha debe ser de mañana en adelante",
      //   value => {
      //     if (!value) return false;
      //     const today = new Date();
      //     today.setHours(0, 0, 0, 0);
      //     const inputDate = new Date(value);
      //     inputDate.setHours(0, 0, 0, 0);
      //     return inputDate >= today;
      //   }
      // ),
    travelers: Yup.array()
      .of(Yup.string().required("El nombre del viajero es requerido"))
      .min(1, "Debes añadir al menos un viajero")
      .required("Debes añadir al menos un viajero"),
    observation: Yup.string(),
  });

  const handleSubmit = async (values: ICreateTrip, { resetForm }: { resetForm: () => void }) => {
    const userId = user?.id;
    console.log("Valores del formulario:", values);
    
    try {
      const res = await createTrip(values, userId, token);
      if (res?.message === "Viaje creado exitosamente") {
        toast.success(res.message);
        console.log("Viaje creado exitosamente: ", res.trip);
        
        resetForm();
        setTimeout(() => {
          router.push("/viajes"); 
        }, 2000);
        return
      }
      if (res?.message === "Ya hay un viaje con ese nombre") {
        toast.error(res.message);
        return
      }
      else {
        toast.error("Error con el servidor");
        console.log("Error al crear el viaje:");
        return
      }
    } catch (error) {
      toast.error("Error interno");
      console.log("Error al crear el viaje:", error);
    }
  };

  return (
      <section className="min-h-screen  m-auto max-w-180 flex flex-col items-start justify-start text-center mt-8">
        <Private />
        {/* <h2 className="font-poppins text-[28px] font-bold text-[#31347B] mt-12">
          Agregar nuevo viaje
        </h2> */}
        <Navbar title="Agregar nuevo viaje" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-black text-left"
            >
              Nombre
            </label>
            <Field
              name="name"
              type="text"
              className="w-full px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          {/* Fecha */}
          <div>
            <label
              htmlFor="date"
              className="block mb-1 text-black text-left"
            >
              Fecha
            </label>
            <Field
              name="date"
              type="date"
              className="w-full px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          {/* Viajeros */}
          <div>
            <label
              htmlFor="travelers"
              className="block mb-1 text-black text-left"
            >
              Viajeros
            </label>
            <FieldArray name="travelers">
              {({ push, remove, form }) => (
                <div className="space-y-2">
                  {form.values.travelers.map((_: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Field
                        name={`travelers[${index}]`}
                        className="w-full px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
                      />

                      {/* Botón + solo en el último campo */}
                      {index === form.values.travelers.length - 1 && (
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="text-black hover:text-green-800"
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      )}

                      {/* Botón eliminar */}
                      {form.values.travelers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <ErrorMessage
              name="travelers"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          {/* Observacion */}
          <div>
            <label
              htmlFor="observation"
              className="block mb-1 text-black text-left"
            >
              Observación
            </label>
            <Field
              as="textarea"
              name="observation"
              className="w-full px-4 py-2 h-40 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2 resize-none"
            />
            <ErrorMessage
              name="observation"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          {/* Botón */}
          <ButtonRed text="Guardar" />
        </Form>
      </Formik>
      </section>
  );
}

