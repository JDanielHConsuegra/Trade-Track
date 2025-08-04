import { IUser } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuthContext } from "@/context/authContext";
import { patchLogin } from "@/service/user";

interface IProps {
  data: IUser[];
}

export const ContainerUserDash: React.FC<IProps> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  const { toggleModificacion } = useAuthContext();

  const toggleUserStatus = async (data: Partial<IUser>) => {
    const valores: Partial<IUser> = {
      username: data.username ?? "",
      email: data.email ?? "",
      admin: data.admin ?? false,
      isActive: data.isActive ?? false,
    };
    console.log("valores a enviar:", valores);

    try {
      const res = await patchLogin(valores, data.id);
      console.log("Respuesta del servidor:", res);
      if (res.message === "Usuario Modificado exitosamente") {
        toast.success("Usuario modificado correctamente");
        toggleModificacion();
      } else {
        toast.error("Error al modificar el usuario");
      }
    } catch (error) {
      toast.error("Error al modificar el usuario");
      console.error("Error al modificar el usuario:", error);
    }
  };

  return (
    <section className="w-full m-auto rounded mt-3">
      <div className="overflow-x-auto w-full">
        <table className="w-fit m-auto table-auto bg-gray-200 border-2 shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white">
            <tr className="*:text-center">
              <th className="px-4 py-3">Nombre de Usuario</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Administrador</th>
              <th className="px-4 py-3">Activo</th>
              <th className="px-4 py-3">Fecha de Creación</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index} className="border-b *:text-center hover:bg-blue-50 transition duration-200">
                <td className="px-4 py-3 font-semibold">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.admin ? "Sí" : "No"}</td>
                <td className="px-4 py-3">{user.isActive ? "Sí" : "No"}</td>
                <td className="px-4 py-3">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : ""}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setUserToEdit(user);
                    }}
                    className="bg-red-500 cursor-pointer text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && userToEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-xs z-50">
          <div className="bg-white border-2 p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Modificar Usuario</h2>

            <Formik
              initialValues={{
                username: userToEdit.username,
                email: userToEdit.email,
                admin: userToEdit.admin,
                isActive: userToEdit.isActive,
              }}
              validationSchema={Yup.object({
                username: Yup.string().required("Nombre de usuario requerido"),
                email: Yup.string().email("Correo inválido").required("Correo requerido"),
                admin: Yup.boolean(),
                isActive: Yup.boolean(),
              })}
              onSubmit={(values) => {
                toggleUserStatus({
                  id: userToEdit.id,
                  ...values,
                });
                setModalOpen(false);
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold" htmlFor="username">Nombre de usuario</label>
                    <Field name="username" className="border p-2 w-full rounded" />
                    <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block font-semibold" htmlFor="email">Email</label>
                    <Field name="email" type="email" className="border p-2 w-full rounded" />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block font-semibold" htmlFor="admin">Administrador</label>
                    <Field name="admin">
                      {({ field, form }: any) => (
                        <select
                          {...field}
                          className="border p-2 w-full rounded"
                          onChange={(e) => form.setFieldValue("admin", e.target.value === "true")}
                        >
                          <option value="true">Sí</option>
                          <option value="false">No</option>
                        </select>
                      )}
                    </Field>
                  </div>

                  <div>
                    <label className="block font-semibold" htmlFor="isActive">Activo</label>
                    <Field name="isActive">
                      {({ field, form }: any) => (
                        <select
                          {...field}
                          className="border p-2 w-full rounded"
                          onChange={(e) => form.setFieldValue("isActive", e.target.value === "true")}
                        >
                          <option value="true">Sí</option>
                          <option value="false">No</option>
                        </select>
                      )}
                    </Field>
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </section>
  );
};