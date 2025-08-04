"use client";
import { useEffect, useState } from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { UserStatsSection } from "@/components/profile/userStatsSection";
import { IProduct, IProvider, ITrip, IUser } from "@/types";
import { useAuthContext } from "@/context/authContext";
import { getTrips } from "@/service/trips";
import { getProductsByUser, getProvidersByUser } from "@/service/providerProducts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEdit, FaUser } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import {  GetUserById, patchLogin } from "@/service/user";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, token, modificacion, toggleModificacion } = useAuthContext();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [providers, setProviders] = useState<IProvider[]>([]);
  

  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser | null>(null);

    useEffect(() => {
            const fetchUser = async () => {
                    const data = await GetUserById(user?.id);
                    setUsers(data as IUser);
                    
            };
            fetchUser();
        }, [modificacion, user]);
        console.log("User Data:", users);
        


  useEffect(() => {
          const fetchTrips = async () => {
              if (user && token) {
                  const data = await getTrips(user.id, token);
                  setTrips(Array.isArray(data) ? data : []);
              }
          };
          fetchTrips();
      }, [user, token]);

useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProvidersByUser(user?.id)
      if (res) setProviders(res)
      else setProviders([])
    }
    fetchProviders()
  }, [user])

useEffect(() => {
      const fetchProducts = async () => {
        const res = await getProductsByUser(user?.id)
        if (Array.isArray(res)) setProducts(res)
        else setProducts([])
      }
      fetchProducts()
    }, [user]);



  const userStats = {
    totalProveedores: providers.length,
    totalProductos: products.length,
    totalViajes: trips.length,
  };

  const initialValuesForm = {
    username: users?.username ?? "",
    email: users?.email ?? "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  });

  const toggleUserStatus = async (data: Partial<IUser>) => {
      const valores: Partial<IUser> = {
        username: data.username ?? "",
        email: data.email ?? "",
      }
      
      console.log("Valores a enviar:", valores);
      try {
        const res = await patchLogin(valores, user?.id);
        
        if(res.message === "Usuario Modificado exitosamente") {
          toast.success("Usuario modificado correctamente");
          toggleModificacion();
          return;
        }
        if(res.message === "Error al modificar el usuario por datos incorrectos"){
          toast.error("Error al modificar el usuario por datos incorrectos");
          return;
        }
        else {
          toast.error("Error al modificar el usuario");
        }
      } catch (error) {
        toast.error("Error interno");
        console.error("Error al modificar el usuario:", error);
      }
    }


  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8 bg-gray-100">
        <div className="mb-8">
        </div>

        <ProfileHeader profile={users} />

        <UserStatsSection userStats={userStats} />

      <Formik
      initialValues={initialValuesForm}
      enableReinitialize={true}
      onSubmit={(values) => {
        toggleUserStatus(values);
      }}
      validationSchema={validationSchema}
      > 

        <Form className="bg-white mt-10 max-w-120 m-auto p-3 rounded-lg shadow-md space-y-6">
          <div className="flex mb-10 items-center justify-around">
          <h2 className="text-2xl text-blue-950 font-bold">Informacion Personal</h2>
          <div className="flex flex-col items-center gap-2">
          <button type="submit" className="bg-blue-950 cursor-pointer hover:bg-blue-900 transition-colors duration-200 p-2 rounded text-white flex items-center gap-2 font-bold"><FaEdit className="text-white" /> Editar</button>
          </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
            <FaUser className="text-2xl text-gray-500 mb-2" />
            <label
              htmlFor="username"
              className="block mb-1 text-black text-left"
            >
              Nombre
            </label>
            </div>

            <Field
              name="username"
              type="text"
              className="w-full px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>
            
          <div>
            <div className="flex items-center gap-2">
            <AiTwotoneMail className="text-2xl text-gray-500 mb-2" />
            <label
              htmlFor="email"
              className="block mb-1 text-black text-left"
            >
              Email
            </label>
            </div>
            <Field
              name="email"
              type="text"
              className="w-full px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>
        </Form>
      </Formik>


      </main>
    </div>
  );
}