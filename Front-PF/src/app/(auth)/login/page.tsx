// src/app/auth/login/page.tsx
"use client"
import Image from "next/image"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import {toast} from "react-toastify"
import { ButtonRed } from "@/components/buttonRed"
import { useAuthContext } from "@/context/authContext"
import { postLogin } from "@/service/auth"
import { Public } from "@/components/Public"

interface LoginValues {
  username: string
  password: string
}

export default function Login() {
  const { saveUserData } = useAuthContext()

  const initialValues: LoginValues = {
    username: "",
    password: "",
  }

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  })
  const handleSubmit = async (
    values: LoginValues,
  ) => {
    try {
      const res = await postLogin(values)
      
      if (res.message === "Usuario logeado exitosamente") {
        toast.success("Bienvenido " + values.username)
        saveUserData({
          user: res.data.user,
          token: res.data.access_token,
          login: true,
        })
        console.log("Usuario logeado exitosamente:", res.data.user);
        
        return
      }
      if (res.message === "Verifica tanto el usuario como la contraseña") {
        toast.error(res.message)
        
        return
      }
      else {
        toast.info(res.message)
      }
    } catch (error) {
      toast.error("Error interno")
      console.error("Error al iniciar sesión:", error)
    }
  }

  // Función para manejar login con Google via Auth0
  const handleGoogleLogin = () => {
    console.log("🔍 [GOOGLE LOGIN] Iniciando login con Google...")
    console.log("🔍 [GOOGLE LOGIN] Todas las variables de entorno:")
    console.log("🔍 [GOOGLE LOGIN] process.env:", process.env)
    
    // URL de Auth0 para login con Google
    // Necesitarás configurar esto en tu dashboard de Auth0
    const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    const redirectUri = `${window.location.origin}/callback`
    
    console.log("🔍 [GOOGLE LOGIN] Auth0 Domain:", auth0Domain)
    console.log("🔍 [GOOGLE LOGIN] Auth0 Client ID:", auth0ClientId)
    console.log("🔍 [GOOGLE LOGIN] Redirect URI:", redirectUri)
    console.log("🔍 [GOOGLE LOGIN] Window origin:", window.location.origin)
    
    if (!auth0Domain || !auth0ClientId) {
      console.error("❌ [GOOGLE LOGIN] Configuración de Auth0 no encontrada")
      console.error("❌ [GOOGLE LOGIN] Domain:", auth0Domain)
      console.error("❌ [GOOGLE LOGIN] Client ID:", auth0ClientId)
      toast.error("Configuración de Auth0 no encontrada")
      return
    }

    const auth0Url = `https://${auth0Domain}/authorize?` +
      `response_type=id_token&` +
      `client_id=${auth0ClientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=openid profile email&` +
      `nonce=${Math.random().toString(36).substring(2, 15)}`

    console.log("🔍 [GOOGLE LOGIN] URL de Auth0 construida:", auth0Url)
    console.log("🚀 [GOOGLE LOGIN] Redirigiendo a Auth0...")
    
    window.location.href = auth0Url
  }

  return (
    <section className=" h-screen flex flex-col items-center justify-center text-center">
      <Public />
      <Image
        src={"/tradeTrack.jpg"}
        alt="login"
        width={260}
        height={142}
      />

      <h2 className="font-poppins text-[28px] font-bold text-blue-950 mt-5 ">Bienvenido</h2>
      <p className="font-roboto font-bold ">Inicie sesión en su cuenta</p>

      {/* Botón de Login con Google */}
      <div className="w-80 mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-gray-700">Continuar con Google</span>
        </button>
      </div>

      {/* Separador */}
      <div className="w-80 mt-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">o</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="w-80 p-6 shadow rounded bg-gray-100 space-y-4 mt-4">
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-bold text-black-700 text-start">
                Usuario
              </label>
              <Field
                type="text"
                name="username"
                placeholder="Ingrese su usuario"
                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 bg-gray-300 "
              />
              <ErrorMessage name="username" component="div" className="text-orange-700 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-bold text-black-700 text-start">
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                placeholder="•••••••"
                className="w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 bg-gray-300"
              />
              <ErrorMessage name="password" component="div" className="text-orange-700 text-sm mt-1" />
            </div>
            <ButtonRed text="Iniciar Sesion" />
            <p>No has registrado tu cuenta? <Link href={"/register"} className="underline font-bold">Registrarme</Link> </p>
          </Form>
        )}
      </Formik>
    </section>
  )
}

