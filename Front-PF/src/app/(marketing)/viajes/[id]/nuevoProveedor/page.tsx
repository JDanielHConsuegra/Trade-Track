"use client";
import { Navbar } from "@/components/navbar";
import { Form, ErrorMessage, Field, Formik } from "formik";
import { Private } from "@/components/Private";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ButtonRed } from "@/components/buttonRed";
// import { FaPlus, FaRegImage, FaCamera, FaRegWindowClose, FaMapMarkedAlt } from 'react-icons/fa';
// import { useState } from "react";
import { CreateProvider } from "@/types";
import { useParams, useRouter } from "next/navigation";
// import { FaMapMarkedAlt } from "react-icons/fa";
import { createTripsProviders } from "@/service/trips";
import { useAuthContext } from "@/context/authContext";


export default function NuevoProveedorPage() {

    // const [showModal, setShowModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { token } = useAuthContext();

    const initialValues: CreateProvider = {
        name: "",
        wechat_contact: "",
        phone_number: "",
        address: "",
        city: "",
        gps_location: "",
        master_genre: "",
        observation: "Sin Observación",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        wechat_contact: Yup.string().required("El contacto de WeChat es obligatorio"),
        phone_number: Yup.string().required("El número de teléfono es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        city: Yup.string().required("La ciudad es obligatoria"),
        gps_location: Yup.string().required("La ubicación GPS es obligatoria"),
        master_genre: Yup.string().required("El género principal es obligatorio"),
        observation: Yup.string().required("La observación es obligatoria"),
    });

    const handleSubmit = async (values: CreateProvider, { resetForm }: { resetForm: () => void }) => {
        const valores = {
            ...values,
            tripId: id,
        };
        console.log("Valores a enviar:", valores);

        try {
            const res = await createTripsProviders(id, valores, token);
            if (res?.message === "Proveedor creado exitosamente") {
                toast.success(res.message);
                setTimeout(() => {
                    router.push(`/viajes/${id}/proveedores`);
                }, 1000);
                return;
            }

            if (res?.message === "Ya hay un proveedor con ese nombre o hay un problema con los datos enviados") {
                toast.error(res.message);
                resetForm();
                return;
            } else {
                toast.error("Error al conectar con el servidor");
                console.log("Error al conectar con el servidor: ", res);
            }
        } catch (error) {
            toast.error("Error interno");
            console.error("Error Interno", error);
        }
        resetForm();
    };


    return (
        <section className="flex flex-col items-start xl:items-center justify-start min-h-screen p-5 bg-gray-100">
            <Private />
            <Navbar title="Nuevo Proveedor" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form className="w-full max-w-[650px] mt-4">

                        {/* <div className="flex justify-between mb-4"> 
                    <div className="flex flex-col">
                    <label htmlFor="">Foto</label>
                    <div className="w-50 h-33 flex justify-center items-center bg-[#D9D9D9] rounded-[10px] "><FaRegImage className="w-16 h-12 text-gray-500 " /></div>
                    </div>

                    <div className="flex flex-col">
                    <label>Agregar Mas fotos</label>

                    <div className="flex gap-1 flex-wrap w-41">
                    <label htmlFor="image" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer" onClick={() => setShowModal(true)}>
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="image"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="image" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="image"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="image" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="image"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="image" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="image"
                        className="hidden"
                    />
                    </label>
                    
                    </div>
                    </div>
                    </div>

                    {showModal && (
                    <div className="fixed inset-0 bg-gray-600/60 backdrop-blur-[2px] flex justify-center items-end z-50">
                        <div className="bg-white shadow-lg p-6 w-full xl:max-w-md rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                        <h2 className="text-lg font-bold mb-4 text-start">Añadir Una Foto</h2>
                        <button onClick={()=>{
                            setShowModal(false);
                            toast.info("Cerraste el modal de fotos");
                        }}><FaRegWindowClose className="text-black cursor-pointer text-2xl"></FaRegWindowClose></button>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                            document.getElementById("image")?.click();
                            toast.success("Elegiste Seleccionar de archivos");
                            setShowModal(false);
                            }}
                            className="w-full hover:shadow-2xl hover:bg-gray-200 cursor-pointer m-auto py-2 mb-3 rounded text-start"
                        >
                        <FaRegImage className="inline mr-2 text-2xl text-black" />
                            Seleccionar de archivos
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                            document.getElementById("image")?.click();
                            toast.success("Elegiste Tomar foto");
                            setShowModal(false);
                            }}
                            className="w-full hover:shadow-2xl hover:bg-gray-200 cursor-pointer m-auto py-2 mb-3 rounded text-start"
                        >
                        <FaCamera className="inline mr-2 text-2xl text-black" />
                        Tomar foto
                        </button>
                        </div>
                    </div>
                    )} */}
                        <div className="flex justify-between *:w-4/10 gap-4">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="name">Nombre</label>
                                <Field name="name" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="wechat_contact">WeChat</label>
                                <Field name="wechat_contact" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="wechat_contact" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="flex justify-between *:w-4/10 gap-4">

                            <div className="flex flex-col mb-4">
                                <label htmlFor="phone_number">Número de Telefono</label>
                                <Field name="phone_number" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="phone_number" component="div" className="text-red-500" />
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="address">Direccion</label>
                                <Field name="address" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="address" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="flex justify-between *:w-4/10 gap-4">

                            <div className="flex flex-col mb-4">
                                <label htmlFor="city">Ciudad</label>
                                <Field name="city" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="city" component="div" className="text-red-500" />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="master_genre">Genero Principal</label>
                                <Field name="master_genre" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                                <ErrorMessage name="master_genre" component="div" className="text-red-500" />
                            </div>
                        </div>

                        <div className="flex justify-around items-center">
                            <div className="flex flex-col w-full mb-4 mr-9">
                                <label htmlFor="gps_location">Ubicación</label>
                                <Field
                                    name="gps_location"
                                    type="text"
                                    className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2"
    
                                />
                                <ErrorMessage name="gps_location" component="div" className="text-red-500" />
                            </div>

                        </div>

                        <div className="flex flex-col mb-4 pt-4">
                            <label htmlFor="observation" className="">Observaciones</label>
                            <Field type="text"
                                as="textarea"
                                name="observation" className="h-40 bg-[#D9D9D9] rounded-[10px] pl-2 " />
                            <ErrorMessage name="observation" component="div" className="text-red-500" />
                        </div>
                        <div className="text-center">
                            <ButtonRed text="Agregar" />
                        </div>

                    </Form>
                )}
            </Formik>
        </section>
    );

}