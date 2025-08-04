import { IProduct } from "@/types";
import Link from "next/dist/client/link";
import { toast } from "react-toastify";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { patchProduct } from "@/service/providerProducts";
import { useAuthContext } from "@/context/authContext";

interface IProps {
  data: IProduct[];
}

export const ContainerProductDash: React.FC<IProps> = ({ data }) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const { toggleModificacion } = useAuthContext();

  const toggleProductStatus = async (values: IProduct) => {
    const valores: Partial<IProduct> = {
      name: values.name,
      // categoryMaster: values.categoryMaster ?? "",
      reference: values.reference,
      cuantity: values.cuantity,
      color: values.color ?? "",
      price: values.price,
      state: values.state ?? "Activo",
    }
    try {
      const res = await patchProduct(values.id, valores);
      if (res && "message" in res && res.message === "Error al actualizar el producto:") {
        toast.error("Error al actualizar el producto");
        return;
      }
      else{
        toast.success("Producto actualizado correctamente");
        toggleModificacion();
        return;
      }
    } catch (error) {
      toast.error("Error al actualizar el producto");
    }
  }



  return (
    <section className="w-full m-auto rounded mt-3">
      <div className="overflow-x-auto w-full">
        <table className="w-fit m-auto table-auto bg-gray-200 border-2 shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white">
            <tr className="*:text-center">
              <th className=" px-4 py-3">Nombre</th>
              <th className=" px-4 py-3">Categoria</th>
              <th className=" px-4 py-3">Nombre Viaje</th>
              <th className=" px-4 py-3">Referencia</th>
              <th className=" px-4 py-3">Cantidad</th>
              <th className=" px-4 py-3">Color</th>
              <th className=" px-4 py-3">Precio</th>
              <th className=" px-4 py-3">Estado</th>
              <th className=" px-4 py-3">Acción</th>
              <th className=" px-4 py-3">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {data.map((producto, index) => (
              <tr
                key={index}
                className="border-b *:text-center hover:bg-blue-50 transition duration-200"
              >
                <td className="px-4 py-3 font-semibold">{producto.name}</td>
                <td className="px-4 py-3">{producto.categoryMaster}</td>
                <td className="px-4 py-3">{producto.trip?.name}</td>
                <td className="px-4 py-3">{producto.reference}</td>
                <td className="px-4 py-3">{producto.cuantity}</td>
                <td className="px-4 py-3">{producto.color}</td>
                <td className="px-4 py-3">${producto.price}</td>
                  <td className="px-4 py-3">{producto.state}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => 
                    {
                      setModalOpen(true);
                      setProductToEdit(producto);
                    }
                    }
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    Modificar
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Link className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200" href={`/productos/details/${producto.id}`}>
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        modalOpen && productToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-xs z-50">
                <div className="bg-white border-2 p-6 rounded shadow-lg w-[400px]">
                  <h2 className="text-xl font-bold mb-4">Modificar Producto</h2>
                  <Formik
                    initialValues={{
                      name: productToEdit?.name || "",
                        // categoryMaster: productToEdit?.categoryMaster || "",
                        reference: productToEdit?.reference || "",
                        cuantity: productToEdit?.cuantity || 0,
                        color: productToEdit?.color || "",
                        price: Number(productToEdit?.price) || 0,
                        state: productToEdit?.state || "Activo",
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string().required("Requerido"),
                      // categoryMaster: Yup.string().required("Requerido"),
                      reference: Yup.string().required("Requerido"),
                      cuantity: Yup.number().required("Requerido"),
                      color: Yup.string().required("Requerido"),
                      price: Yup.number().required("Requerido"),
                      state: Yup.string().required("Requerido"),
                    })}
                    onSubmit={(values) => 
                    {
                      console.log("Valores del formulario:", values);
                      
                      toggleProductStatus({
                        ...productToEdit,
                        ...values,
                        // categoryMaster: values.categoryMaster ?? "",
                        color: values.color ?? "",
                      })
                      setModalOpen(false);
                    }
                  
                  }
                  >
                    <Form className="space-y-4">
                      <div>
                        <label className="block font-semibold" htmlFor="name">Nombre</label>
                        <Field name="name" className="border p-2 w-full rounded"  type="text" />
                        <ErrorMessage name="name" component="div" />
                      </div>
                      <div>
                        <label className="block font-semibold" htmlFor="reference">Referencia</label>
                        <Field name="reference" className="border p-2 w-full rounded"  type="text" />
                        <ErrorMessage name="reference" component="div" />
                      </div>

                      <div className="flex justify-around gap-4">
                      <div>
                        <label className="block font-semibold" htmlFor="cuantity">Cantidad</label>
                        <Field name="cuantity" className="border p-2 w-full rounded"  type="number" />
                        <ErrorMessage name="cuantity" component="div" />
                      </div>
                      <div>
                        <label className="block font-semibold" htmlFor="price">Precio</label>
                        <Field name="price" className="border p-2 w-full rounded"  type="number" />
                        <ErrorMessage name="price" component="div" />
                      </div>
                      <div>
                        <label className="block font-semibold" htmlFor="color">Color</label>
                        <Field name="color" className="border p-2 w-full rounded"  type="text" />
                        <ErrorMessage name="color" component="div" />
                      </div>
                      </div>

                    <div className="flex flex-col mb-4">
                    <p className="self-center font-bold">Estado</p>
                   <div className="flex *:bg-gray-300 *:cursor-pointer *:p-2 *:rounded-md flex-wrap gap-2 justify-center items-center rounded-2xl p-3 *:w-3/10 mb-4">
                    <label className="flex flex-col items-center gap-1">
                        Aprobado
                        <Field
                        type="radio"
                        name="state"
                        value="approved"
                        className="accent-blue-900"
                        />
                    </label>

                    <label className="flex flex-col items-center gap-1">
                        Pendiente
                        <Field
                        type="radio"
                        name="state"
                        value="pending"
                        className="accent-blue-900"
                        />
                    </label>

                    <label className="flex flex-col items-center gap-1">
                        Rechazado
                        <Field
                        type="radio"
                        name="state"
                        value="cancelled"
                        className="accent-blue-900"
                        />
                    </label>
                    </div>
                    </div>

                    {/* <div className="flex flex-col mb-4">
                    <p className="self-center font-bold">Categoria</p>
                   <div className="flex *:bg-gray-300 *:cursor-pointer *:p-2 *:w-40 *:rounded-md flex-wrap gap-2 justify-center items-center rounded-2xl p-3 mb-4">
                    <label className="flex bg-gray-300 p-2 rounded-md flex-col items-center gap-1">
                        Electrodomesticos
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="electrodomesticos"
                        className="accent-blue-900"
                        />
                    </label>

                    <label className="flex flex-col items-center gap-1">
                        Tecnologia
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="tecnologia"
                        className="accent-blue-900"
                        />
                    </label>

                    <label className="flex flex-col items-center gap-1">
                        Muebles
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="muebles"
                        className="accent-blue-900"
                        />
                    </label>

                    <label className="flex flex-col items-center gap-1">
                        Ropa
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="ropa"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Juguetes
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="juguetes"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Herramientas
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="herramientas"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Hogar
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="hogar"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Deportes
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="deportes"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Libros
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="libros"
                        className="accent-blue-900"
                        />
                    </label>
                    <label className="flex flex-col items-center gap-1">
                        Belleza
                        <Field
                        type="radio"
                        name="categoryMaster"
                        value="belleza"
                        className="accent-blue-900"
                        />
                    </label>
                    </div>
                    </div> */}
                      
                      
                      
                      <div className="flex justify-around">
                      <button type="submit"
                      className="bg-blue-950 text-white py-1 px-3 rounded hover:bg-blue-600 cursor-pointer transition duration-200"
                      >Guardar Cambios</button>
                      <button type="button"
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer transition duration-200"
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