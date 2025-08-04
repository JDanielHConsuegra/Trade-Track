"use client"
import Image from "next/image"
import Link from "next/link"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ButtonRed } from "@/components/buttonRed"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { postRegister } from "@/service/auth"
import { IUserRegister } from "@/types"
import { Public } from "@/components/Public"


export default function Register() {
  const initialValues: IUserRegister = {
    username: "",
    email: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Requerido"),
    email: Yup.string().email("Correo inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
    })

  const router = useRouter()

  const  handleSubmit = async (
    values: IUserRegister,
  ) => {
    try {
    const res = await postRegister(values)
    console.log("🔍 [DEBUG] Respuesta completa del registro:", res)
    
    if (res.message === "Usuario registrado exitosamente") {
      console.log("🔍 [DEBUG] Registro exitoso, redirigiendo...")
      toast.success("Registro exitoso, Bienvenido " + values.username)
      setTimeout(()=> {
        router.push("/login")
      }, 2000)
      return
    }
    if (res.message === "Ese usuario ya existe, intenta con otro correo") {
      toast.error("Ese usuario ya existe, intenta con otro nombre de usuario")
      return
    }
    if (res.message === "Error al conectar con el servidor") {
      toast.error(res.message)
      return
    }
    else {
      toast.info(res.message)
      router.push("/login")
      return
    }
  } catch (error) {
      toast.error("Error interno")
      console.error("Error al registrar el usuario:", error)
    
  }
  }

  return (
    <section className=" min-h-screen flex flex-col items-center justify-center text-center p-4">
      <Public />
      <Image src="/tradeTrack.jpg" alt="login" width={260} height={142} />
      <h2 className="font-poppins text-[28px] font-bold text-blue-950 mt-5">Bienvenido</h2>
      <p className="font-roboto font-bold">Crea una Nueva Cuenta</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="w-80 p-6 space-y-4 shadow rounded bg-gray-100 mt-5">


            {/* Usuario */}
            <div>
              <label htmlFor="username" className="block mb-1 font-bold text-black text-left">Nombre de usuario</label>
              <Field
                name="username"
                type="text"
                placeholder="juanperez"
                className="w-full px-4 py-2 rounded-3xl bg-gray-300 focus:outline-none focus:ring-2"
              />
              <ErrorMessage name="username" component="div" className="text-orange-700 text-sm mt-1" />
            </div>

            {/* Correo */}
            <div>
              <label htmlFor="email" className="block mb-1 font-bold text-black text-left">Correo Electrónico</label>
              <Field
                name="email"
                type="email"
                placeholder="usuario@correo.com"
                className="w-full px-4 py-2 rounded-3xl bg-gray-300 focus:outline-none focus:ring-2"
              />
              <ErrorMessage name="email" component="div" className="text-orange-700 text-sm mt-1" />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block mb-1 font-bold text-black text-left">Contraseña</label>
              <Field
                name="password"
                type="password"
                placeholder="•••••••"
                className="w-full px-4 py-2 rounded-3xl bg-gray-300 focus:outline-none focus:ring-2"
              />
              <ErrorMessage name="password" component="div" className="text-orange-700 text-sm mt-1" />
            </div>

            {/* Botón */}
            <ButtonRed text="Registrarse" />

            <p className=" text-center mt-2">
              ¿Ya registraste tu cuenta? <Link href="/login" className="underline font-bold">Log-in</Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  )
}