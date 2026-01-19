"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Form, ErrorMessage, Field, Formik } from "formik";
import { Private } from "@/components/Private";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ButtonRed } from "@/components/buttonRed";
// import { FaPlus, FaRegImage, FaCamera, FaRegWindowClose } from 'react-icons/fa';
// import { useState } from "react";
import { CreateProduct, ProductCategory, ProductState } from "@/types";
import { createTripsProducts } from "@/service/trips";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";

 
export default function NuevoProductoPage() {

    // const [showModal, setShowModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { token } = useAuthContext();
    const router = useRouter();
    const initialValues: CreateProduct = {
        categoryMaster: ProductCategory.BELLEZA,
          reference: "",
          name: "",
          price: 0,
          cuantity: 0,
          color: "",
          height: 0,
          width: 0,
          depth: 0,
          manufacturing_date: new Date(),
          quantity_per_box: 0,
          total_quantity_per_box: 0,
          total_quantity: 0,
          own_packaging: true,
          desactivated: true,
        state: ProductState.PENDING,
    }

    const validationSchema = Yup.object().shape({
        categoryMaster: Yup.mixed<ProductCategory>()
    .oneOf(Object.values(ProductCategory))
    .required('Categoría obligatoria'),

  reference: Yup.string()
    .min(1, 'Referencia requerida')
    .required('Referencia obligatoria'),

  name: Yup.string()
    .min(1, 'Nombre requerido')
    .required('Nombre obligatorio'),

  price: Yup.number()
    .positive('Debe ser un número positivo')
    .required('Precio obligatorio'),

  cuantity: Yup.number()
    .integer('Cantidad debe ser entera')
    .min(1, 'Debe ser al menos 1')
    .required('Cantidad obligatoria'),

  color: Yup.string()
    .required('Color obligatorio'),

  height: Yup.number()
    .min(0, 'Altura mínima 0')
    .required('Altura obligatoria'),

  width: Yup.number()
    .min(0, 'Ancho mínimo 0')
    .required('Ancho obligatorio'),

  depth: Yup.number()
    .min(0, 'Profundidad mínima 0')
    .required('Profundidad obligatoria'),

  manufacturing_date: Yup.date()
    .required('Fecha de fabricación obligatoria'),

  quantity_per_box: Yup.number()
    .integer()
    .required('Cantidad por caja obligatoria'),

  total_quantity_per_box: Yup.number()
    .integer()
    .required('Cantidad total por caja obligatoria'),

  total_quantity: Yup.number()
    .integer()
    .required('Cantidad total obligatoria'),

  own_packaging: Yup.boolean()
    .required(),

  desactivated: Yup.boolean()
    .required(),

  state: Yup.mixed<ProductState>()
    .oneOf(Object.values(ProductState))
    .required(),

}); 

    const handleSubmit = async (values: CreateProduct, { resetForm }: { resetForm: () => void }) => {
        const valores: CreateProduct & { tripId: string } = {
            ...values,
            tripId: id
        };
        console.log("Valores a enviar:", valores);
        try {
  const res = await createTripsProducts(id, valores, token)

  if (res?.message === "Producto creado exitosamente") {
    toast.success("Producto creado exitosamente")
    resetForm()
    setTimeout(() => {
      router.push(`/viajes/${id}/productos`)
      toast.info("Redirigiendo a la lista de productos")
    }, 1000)
    return
  } 
  if ( res?.message === "Ya hay un producto con ese nombre o hay un problema con los datos enviados" ) {
    toast.error("Ya hay un producto con ese nombre o hay un problema con los datos enviados")
    resetForm()
    return
  }
    if (res?.message === "Error al conectar con el servidor: ") {
        toast.error(res.message)
        resetForm()
        return
    }
} catch (error) {
  toast.error("Error inesperado en la solicitud")
  resetForm()
  console.log("Error interno al crear el producto:", error)
}
    };


    return (
        <section className="flex flex-col items-start xl:items-center justify-start min-h-screen p-5 bg-gray-100">
            <Private />
            <Navbar title="Nuevo Producto" />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {() => (
                <Form className="w-full flex flex-col max-w-[650px] mt-4">
                    
                    <div className="flex flex-col mb-4">
                        <label htmlFor="reference">Referencia</label>
                        <Field name="reference" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2 " />
                        <ErrorMessage name="reference" component="div" className="text-red-500 mb-4" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name">Nombre</label>
                        <Field name="name" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                        <ErrorMessage name="name" component="div" className="text-red-500 mb-4" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="manufacturing_date">Fecha de Manufacturacion</label>
                        <Field name="manufacturing_date" type="date" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                        <ErrorMessage name="manufacturing_date" component="div" className="text-red-500 mb-4" />
                    </div>

                    {/* <div className="flex justify-between mb-4">
                    <div className="flex flex-col">
                    <label htmlFor="">Foto</label>
                    <div className="w-50 h-33 flex justify-center items-center bg-[#D9D9D9] rounded-[10px] "><FaRegImage className="w-16 h-12 text-gray-500 " /></div>
                    </div>
                    <div className="flex flex-col">
                    <label>Agregar Mas fotos</label>

                    <div className="flex gap-1 w-43 flex-wrap">

                    <label htmlFor="images" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer" onClick={() => setShowModal(true)}>
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="images"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="image" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="images"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="images" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="images"
                        className="hidden"
                    />
                    </label>
                    <label onClick={() => setShowModal(true)} htmlFor="images" className="bg-[#D9D9D9] flex justify-center items-center w-20 h-16 rounded-[10px] cursor-pointer">
                    <FaPlus className="text-xl text-gray-600" />
                    <Field
                        type="file"
                        name="images"
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
                            Seleccionar desde archivos
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
                    <div className="flex flex-col mb-4">
                        <label htmlFor="color">Color</label>
                        <Field name="color" type="text" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2 " />
                        <ErrorMessage name="color" component="div" className="text-red-500 mb-4" />
                    </div>
                    <div className="flex justify-around *:w-30/100 mb-4">                
                        <div className="flex flex-col">
                            <label htmlFor="price">Precio</label>
                            <Field name="price" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                            <ErrorMessage name="price" component="div" className="text-red-500 mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="cuantity">Cantidad</label>
                            <Field name="cuantity" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                            <ErrorMessage name="cuantity" component="div" className="text-red-500 mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="total_quantity">Cantidad Total</label>
                            <Field name="total_quantity" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                            <ErrorMessage name="total_quantity" component="div" className="text-red-500 mb-4" />
                        </div>
                    </div>

                    

                    <div className="flex justify-center gap-10 mb-4">                
                        <div className="flex flex-col">
                            <label htmlFor="quantity_per_box">Cantidad Por Caja</label>
                            <Field name="quantity_per_box" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                            <ErrorMessage name="quantity_per_box" component="div" className="text-red-500 mb-4" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="total_quantity_per_box">Cantidad Total Por Caja</label>
                            <Field name="total_quantity_per_box" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 pl-2" />
                            <ErrorMessage name="total_quantity_per_box" component="div" className="text-red-500 mb-4" />
                        </div>
                        
                    </div>

                    <label className="flex justify-end flex-row-reverse items-center gap-3 cursor-pointer mb-4">
                        <Field
                            type="checkbox"
                            name="own_packaging"
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-red-500 rounded-full peer-checked:bg-blue-700 relative flex items-center justify-start peer-checked:justify-end transition-all px-1">
                            <div className="w-5 h-5 bg-white rounded-full transition-transform" />
                            <span className="absolute text-white text-xs font-semibold left-2 peer-checked:left-auto peer-checked:right-2 transition-all">
                            <span className="peer-checked:opacity-0">Si</span>
                            <span className="peer-checked:opacity-100 absolute ml-4">No</span>
                            </span>
                        </div>
                        <span>Propio Paquete</span>
                    </label>

                    <p className="mb-2 self-center font-bold">Tamaño Producto en cm</p>
                    <div className="flex justify-around mb-7">                
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center flex-col">
                            <label htmlFor="height">Alto</label>
                            <Field name="height" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 w-8 pl-2" />
                            </div>
                            <ErrorMessage name="height" component="div" className="text-red-500 mb-4" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center flex-col">
                            <label htmlFor="width">Ancho</label>
                            <Field name="width" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 w-8 pl-2" />
                            </div>
                            <ErrorMessage name="width" component="div" className="text-red-500 mb-4" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center flex-col">
                            <label htmlFor="depth">Profundidad</label>
                            <Field name="depth" type="number" className="bg-[#D9D9D9] rounded-[10px] h-8 w-8 pl-2" />
                            </div>
                            <ErrorMessage name="depth" component="div" className="text-red-500 mb-4" />
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

                    <div className="flex flex-col mb-4">
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
                    </div>
                    <div className="text-center">
                        <ButtonRed text="Agregar"/>
                    </div>
                </Form>
            )}
            </Formik>
        </section>
    );
    
}
