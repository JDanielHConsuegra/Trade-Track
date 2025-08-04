// src/app/auth/callback/page.tsx
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/authContext"
import { toast } from "react-toastify"

export default function AuthCallback() {
  const router = useRouter()
  const { saveUserData } = useAuthContext()

  useEffect(() => {
    const handleCallback = async () => {
      console.log("🔍 [AUTH0 CALLBACK] Iniciando callback...")
      console.log("🔍 [AUTH0 CALLBACK] URL actual:", window.location.href)
      
      try {
        // Obtener el token de la URL (Auth0 devuelve el token en el fragmento)
        const hash = window.location.hash.substring(1)
        console.log("🔍 [AUTH0 CALLBACK] Hash de la URL:", hash)
        
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const error = params.get('error')
        const errorDescription = params.get('error_description')
        
        console.log("🔍 [AUTH0 CALLBACK] Token encontrado:", accessToken ? "SÍ" : "NO")
        console.log("🔍 [AUTH0 CALLBACK] Error encontrado:", error || "NO")
        console.log("🔍 [AUTH0 CALLBACK] Descripción del error:", errorDescription || "NO")

        if (error) {
          console.error("❌ [AUTH0 CALLBACK] Error de Auth0:", error, errorDescription)
          toast.error(`Error de autenticación: ${errorDescription || error}`)
          router.push('/login')
          return
        }

        if (!accessToken) {
          console.error("❌ [AUTH0 CALLBACK] No se recibió token de acceso")
          toast.error("No se recibió token de acceso")
          router.push('/login')
          return
        }

        // Enviar el token a tu backend para validarlo
        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`
        console.log("🔍 [AUTH0 CALLBACK] Enviando token al backend:", backendUrl)
        console.log("🔍 [AUTH0 CALLBACK] Token (primeros 20 chars):", accessToken.substring(0, 20) + "...")
        
        const response = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        console.log("🔍 [AUTH0 CALLBACK] Respuesta del backend:", response.status, response.statusText)
        console.log("🔍 [AUTH0 CALLBACK] Headers de respuesta:", Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          console.error("❌ [AUTH0 CALLBACK] Error del backend:", response.status, response.statusText)
          const errorText = await response.text()
          console.error("❌ [AUTH0 CALLBACK] Respuesta de error:", errorText)
          throw new Error(`Error al validar token con el backend: ${response.status} ${response.statusText}`)
        }

        const userData = await response.json()
        console.log("✅ [AUTH0 CALLBACK] Datos del usuario recibidos:", userData)

        // Guardar datos del usuario en el contexto
        saveUserData({
          user: userData.user,
          token: accessToken,
          login: true,
        })

        console.log("✅ [AUTH0 CALLBACK] Usuario guardado en contexto")
        toast.success("¡Inicio de sesión exitoso!")
        router.push('/')

      } catch (error) {
        console.error('❌ [AUTH0 CALLBACK] Error en callback:', error)
        toast.error("Error al procesar la autenticación")
        router.push('/login')
      }
    }

    handleCallback()
  }, [router, saveUserData])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Procesando autenticación...</p>
      </div>
    </div>
  )
} 