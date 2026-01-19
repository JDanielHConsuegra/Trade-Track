"use client"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/authContext"
import { toast } from "react-toastify"

export default function Callback() {
  const router = useRouter()
  const { saveUserData } = useAuthContext()

  useEffect(() => {
    const handleCallback = async () => {
      console.log("🔍 [CALLBACK] Iniciando callback...")
      console.log("🔍 [CALLBACK] URL actual:", window.location.href)
      
      try {
        // Obtener el token de la URL (Auth0 devuelve el token en el fragmento)
        const hash = window.location.hash.substring(1)
        console.log("🔍 [CALLBACK] Hash de la URL:", hash)
        
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const idToken = params.get('id_token')
        const error = params.get('error')
        const errorDescription = params.get('error_description')
        
        console.log("🔍 [CALLBACK] Token encontrado:", accessToken ? "SÍ" : "NO")
        console.log("🔍 [CALLBACK] ID Token encontrado:", idToken ? "SÍ" : "NO")
        console.log("🔍 [CALLBACK] Error encontrado:", error || "NO")
        console.log("🔍 [CALLBACK] Descripción del error:", errorDescription || "NO")

        if (error) {
          console.error("❌ [CALLBACK] Error de Auth0:", error, errorDescription)
          toast.error(`Error de autenticación: ${errorDescription || error}`)
          router.push('/login')
          return
        }

        if (!idToken) {
          console.error("❌ [CALLBACK] No se recibió ID token")
          toast.error("No se recibió ID token")
          router.push('/login')
          return
        }

        // Enviar el ID token a tu backend para validarlo
        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/profile`
        console.log("🔍 [CALLBACK] Enviando ID token al backend:", backendUrl)
        console.log("🔍 [CALLBACK] ID Token (primeros 20 chars):", idToken.substring(0, 20) + "...")
        console.log("🔍 [CALLBACK] API URL desde env:", process.env.NEXT_PUBLIC_API_URL)
        
        try {
          const response = await fetch(backendUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            }
          })

          console.log("🔍 [CALLBACK] Respuesta del backend:", response.status, response.statusText)
          console.log("🔍 [CALLBACK] Headers de respuesta:", Object.fromEntries(response.headers.entries()))

          if (!response.ok) {
            console.error("❌ [CALLBACK] Error del backend:", response.status, response.statusText)
            const errorText = await response.text()
            console.error("❌ [CALLBACK] Respuesta de error:", errorText)
            throw new Error(`Error al validar token con el backend: ${response.status} ${response.statusText}`)
          }

          const userData = await response.json()
          console.log("✅ [CALLBACK] Datos del usuario recibidos:", userData)

          // Guardar datos del usuario en el contexto
          saveUserData({
            user: userData.user,
            token: idToken,
            login: true,
          })

          console.log("✅ [CALLBACK] Usuario guardado en contexto")
          toast.success("¡Inicio de sesión exitoso!")
          router.push('/')

        } catch (fetchError) {
          console.error("❌ [CALLBACK] Error en fetch:", fetchError)
          console.error("❌ [CALLBACK] URL que falló:", backendUrl)
          throw fetchError
        }

      } catch (error) {
        console.error('❌ [CALLBACK] Error en callback:', error)
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