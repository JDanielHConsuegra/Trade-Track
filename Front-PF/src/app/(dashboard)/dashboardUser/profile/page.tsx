"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEdit, FaUser } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import { toast } from "react-toastify";

import {  GetUserById, patchLogin } from "@/service/user";
import { UserStatsSection } from "@/components/profile/userStatsSection";
import { IProduct, IProvider, ITrip, IUser } from "@/types";
import { useAuthContext } from "@/context/authContext";
import { getTrips } from "@/service/trips";
import { getProductsByUser, getProvidersByUser } from "@/service/providerProducts";
import { ProfileHeader } from "@/components/profile/profileHeader";


export default function ProfilePage(): React.ReactNode {
  const { user, token, modificacion, toggleModificacion } = useAuthContext();
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [providers, setProviders] = useState<IProvider[]>([]);
  

  const [products, setProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<IUser | null>(null);

    useEffect(() => {
            const fetchUser = async (): Promise<undefined> => {
                    const data = await GetUserById(user?.id);
                    setUsers(data as IUser);
                    
            };
            fetchUser();
        }, [modificacion, user]);
        


  useEffect(() => {
          const fetchTrips = async (): Promise<undefined> => {
              if (user && token) {
                  const data = await getTrips(user.id, token);
                  setTrips(Array.isArray(data) ? data : []);
              }
          };
          fetchTrips();
      }, [user, token]);

useEffect(() => {
    const fetchProviders = async (): Promise<undefined> => {
      const res = await getProvidersByUser(user?.id)
      if (res) setProviders(res)
      else setProviders([])
    }
    fetchProviders()
  }, [user])

useEffect(() => {
      const fetchProducts = async (): Promise<undefined> => {
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

  const toggleUserStatus = async (data: Partial<IUser>): Promise<undefined> => {
      const valores: Partial<IUser> = {
        username: data.username ?? "",
        email: data.email ?? "",
      }
      
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
        toast.error("Error interno " + error);
      }
    }


  return (
    <div className="flex min-h-screen">
      <main className="flex flex-col p-3 rounded-t-2xl bg-gray-100 w-full mx-auto">
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

        <Form className="bg-white md:w-1/2 mt-10 m-auto p-6 rounded-lg shadow-md space-y-6">
          <div className="flex mb-10 items-center justify-between">
          <h2 className="text-xl md:text-2xl text-blue-950 font-bold">Editar Perfil</h2>
          <div className="flex flex-col items-center gap-2">
          <button type="submit" className="bg-blue-950 cursor-pointer hover:bg-blue-900 transition-colors duration-200 p-2 rounded text-white flex items-center gap-2 font-bold"><FaEdit className="text-white md:text-3xl" /></button>
          </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
            <FaUser className="text-2xl text-gray-500 mb-2" />
            <label
              htmlFor="username"
              className="block mb-1 md:text-xl text-black text-left"
            >
              Nombre
            </label>
            </div>

            <Field
              name="username"
              type="text"
              className="w-full md:text-xl px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
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
              className="block mb-1 md:text-xl text-black text-left"
            >
              Email
            </label>
            </div>
            <Field
              name="email"
              type="text"
              className="w-full md:text-xl px-4 py-2 rounded-[10px] bg-[#D9D9D9] focus:outline-none focus:ring-2"
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