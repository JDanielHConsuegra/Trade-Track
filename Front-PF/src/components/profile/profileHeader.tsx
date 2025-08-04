import { IUser } from "@/types";
import { ErrorMessage, Form, Formik } from "formik";
import { FaMailBulk } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import { FaCameraRetro } from 'react-icons/fa';
import * as Yup from "yup";
import {  useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/authContext";
import { uploadProfileImage } from "@/service/user";
import Image from "next/image";

interface ProfileHeaderProps {
  profile: IUser | null;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const {user, toggleModificacion} = useAuthContext();
  const toggleImage = async (values: { Image_Profile: File | string }) => {
    const valores = new FormData();
    valores.append("file", values.Image_Profile);
    console.log("Valores enviados:", valores.get("file"));
    
    try {
      const res = await uploadProfileImage(valores, user?.id);
      if (res.message === "Foto de perfil actualizada exitosamente") {
        toast.success("Foto de perfil actualizada exitosamente");
        toggleModificacion();
        return;
      }
      else {
        toast.info("Error al actualizar la foto de perfil");
        console.log("error:", res.error);
      }
    } catch (error) {
      toast.error("Error al actualizar la foto de perfil");
      console.log("Error al actualizar la foto de perfil:", error);
    }
    
  };

  const initialValuesForm = {
    Image_Profile: ""
  };

  const FILE_SIZE = 900_000; // 900 KB
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
];

const validationSchema = Yup.object().shape({
  Image_Profile: Yup.mixed()
    .required("La imagen es obligatoria")
    .test("fileSize", "El archivo es demasiado grande", (value) =>
      value && value instanceof File ? value.size <= FILE_SIZE : false
    )
    .test("fileFormat", "Formato de imagen no válido", (value) =>
      value && value instanceof File ? SUPPORTED_FORMATS.includes(value.type) : false
    ),
});


  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-white m-auto max-w-110 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="text-white cursor-pointer bg-blue-950 p-2 rounded-full hover:bg-blue-900"
        >
          <FaCameraRetro className="text-3xl" />
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/80">
          <div className="bg-white rounded-lg p-6 w-[320px]">
            <h2 className="text-xl font-bold mb-4">Cambiar Foto</h2>
            <Formik
              initialValues={initialValuesForm}
              onSubmit={(values) => {
                toggleImage(values);
                setModalOpen(false);
              }}
              validationSchema={validationSchema}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col items-center gap-4">
                  <label
                    htmlFor="Image_Profile"
                    className="cursor-pointer text-blue-950 hover:text-gray-600"
                  >
                    <FaCameraRetro className="text-4xl" />
                  </label>
                  <input
                    id="Image_Profile"
                    name="Image_Profile"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        setFieldValue("Image_Profile", file);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="Image_Profile"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="bg-blue-950 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-900"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400"
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

      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="bg-gradient-to-br rounded-2xl from-blue-950 to-gray-600 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.Image_Profile ? (
              <Image
                src={String(profile.Image_Profile)}
                alt={profile.username || "Avatar"}
                width={80}
                height={100}
                className="rounded-2xl"
              />
            ) : (
              <span className="text-3xl w-[80px] h-[100px] flex items-center justify-center">
                {profile?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-start items-center gap-3">
            <FaUserTie className="text-3xl text-gray-500" />
            <b>{profile?.username}</b>
          </div>
          <hr />
          <div className="flex justify-start items-center gap-3">
            <FaMailBulk className="text-3xl text-gray-500" />
            <b>{profile?.email}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

