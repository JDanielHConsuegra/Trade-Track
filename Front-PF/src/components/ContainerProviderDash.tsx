import { IProvider } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { patchProvider } from "@/service/providerProducts";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";

interface IProps {
  data: IProvider[];
} 

export const ContainerProviderDash: React.FC<IProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<IProvider | null>(null);
  const { toggleModificacion } = useAuthContext();

  const toggleProductStatus = async (values: IProvider) => {
    const valores: Partial<IProvider> = {
      name: values.name,
      wechat_contact: values.wechat_contact ?? "",
      phone_number: values.phone_number,
      address: values.address,
      city: values.city,
      master_genre: values.master_genre ?? "",
    }
    try {
      const res = await patchProvider(values.id, valores);
      if ('message' in res && res.message === "Error al actualizar el proveedor:") {
        toast.error("Error al actualizar el proveedor");
        return;
      } else {
        toast.success("Proveedor actualizado correctamente");
        toggleModificacion();
        return;
      }
    } catch (error) {
      toast.error("Error al actualizar el estado del producto");
      console.log("Error al actualizar el estado del producto:", error);
      
    }

    toast.success("Estado del producto actualizado");
    console.log(`Producto con ID ${values.id} desactivado`);
  }



  return (
    <section className="w-full m-auto rounded mt-3">
      <div className="overflow-x-auto w-full">
        <table className="w-fit m-auto table-auto bg-gray-200 border-2 shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white">
            <tr className="*:text-center">
              <th className=" px-4 py-3">Nombre</th>
              <th className=" px-4 py-3">WeChat</th>
              <th className=" px-4 py-3">Numero de Telefono</th>
              <th className=" px-4 py-3">Direccion</th>
              <th className=" px-4 py-3">Ciudad</th>
              <th className=" px-4 py-3">Genero Principal</th>
              <th className=" px-4 py-3">Estado</th>
              <th className=" px-4 py-3">Acción</th>
              <th className=" px-4 py-3">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((provider, index) => (
              <tr
                key={index}
                className="border-b *:text-center hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3 font-semibold">{provider.name}</td>
                <td className="px-4 py-3">{provider.wechat_contact}</td>
                <td className="px-4 py-3">{provider.phone_number}</td>
                <td className="px-4 py-3">{provider.address}</td>
                <td className="px-4 py-3">{provider.city}</td>
                <td className="px-4 py-3">{provider.master_genre}</td>
                <td className="px-4 py-3">{provider.is_active ? "Activo" : "Inactivo"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setModalOpen(true)
                      setProviderToEdit(provider)
                    }} 
                    className="bg-red-500 cursor-pointer text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    Modificar
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Link className="bg-red-500 cursor-pointer text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200" href={`/proveedores/details/${provider.id}`}>
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        modalOpen && providerToEdit && (
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-xs z-50">
        <div className="bg-white border-2 p-6 rounded shadow-lg w-[400px]">
          <h2 className="text-xl font-bold mb-4">Modificar Proveedor</h2>
          <Formik
            initialValues={{
              name: providerToEdit.name,
              wechat_contact: providerToEdit.wechat_contact,
              phone_number: providerToEdit.phone_number,
              address: providerToEdit.address,
              city: providerToEdit.city,
              master_genre: providerToEdit.master_genre,
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Requerido"),
              wechat_contact: Yup.string().required("Requerido"),
              phone_number: Yup.string().required("Requerido"),
              address: Yup.string().required("Requerido"),
              city: Yup.string().required("Requerido"),
              master_genre: Yup.string().required("Requerido"),
            })}
            onSubmit={(values) => {
              toggleProductStatus({
                ...providerToEdit,
                ...values,
                wechat_contact: values.wechat_contact ?? "",
                master_genre: values.master_genre ?? "",
              })
              setModalOpen(false);
            }}
          >
            <Form className="space-y-4">
              <div>
                <label className="block font-semibold" htmlFor="name">Nombre</label>
                <Field name="name" className="border p-2 w-full rounded"  type="text" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="wechat_contact">WeChat</label>
                <Field name="wechat_contact" className="border p-2 w-full rounded" type="text" />
                <ErrorMessage name="wechat_contact" component="div" />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="phone_number">Número de Teléfono</label>
                <Field name="phone_number" className="border p-2 w-full rounded" type="text" />
                <ErrorMessage name="phone_number" component="div" />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="address">Dirección</label>
                <Field name="address" className="border p-2 w-full rounded" type="text" />
                <ErrorMessage name="address" component="div" />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="city">Ciudad</label>
                <Field name="city" className="border p-2 w-full rounded" type="text" />
                <ErrorMessage name="city" component="div" />
              </div>
              <div>
                <label className="block font-semibold" htmlFor="master_genre">Género Principal</label>
                <Field name="master_genre" className="border p-2 w-full rounded" type="text" />
                <ErrorMessage name="master_genre" component="div" />
              </div>
              <div className="flex justify-around">
              <button type="submit"
              className="bg-blue-950 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
              >Guardar Cambios</button>
              <button type="button"
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
              onClick={() => setModalOpen(false)}>Descartar Cambios</button>
              </div>
            </Form>
          </Formik>
          </div>
          </div>
        )
      }
    </section>
  );
};