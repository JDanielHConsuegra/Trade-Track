// "use server";

import { IProduct, IProvider } from "@/types"
import axios, { AxiosError } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

// GET all providers
export const getProviders = async (): Promise<IProvider[] | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/providers`)
    return res.data as IProvider[]
  } catch (error) {
    console.log("Error al obtener proveedores:", (error as AxiosError).message)
    return null
  }
}

// GET provider by ID
export const getProviderById = async (id: string): Promise<IProvider | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/providers/${id}`)
    return res.data as IProvider
  } catch (error) {
    console.log("Error al obtener proveedor por ID:", (error as AxiosError).message)
    return null
  }
}

// GET all providers by user
export const getProvidersByUser = async (userId: string | undefined): Promise<IProvider[] | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/providers/${userId}/providers`)
    return res.data as IProvider[]
  } catch (error) {
    console.log("Error al obtener proveedores por usuario:", (error as AxiosError).message)
    return null
  }
}

//Patch providers

export const patchProvider = async (
  providerId: string,
  data: Partial<IProvider>
): Promise<IProvider | { message: string; error?: unknown }> => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/providers/${providerId}`, data)
    if (res.status !== 200) {
      return {
        message: "Error al actualizar el proveedor:",
      }
    }
    return res.data as IProvider
  } catch (error) {
    const err = error as AxiosError
    return {
      message: "Error al actualizar el proveedor:",
      error: err.response?.data || "Error desconocido",
    }
  }
}


// GET all products
export const getProducts = async (): Promise<IProduct[] | { message: string; error: unknown }> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products`)
    return res.data as IProduct[]
  } catch (error) {
    const err = error as AxiosError
    return {
      message: "Error al conectar con el servidor:",
      error: err.response?.data || "Error desconocido",
    }
  }
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products/${id}`)
    return res.data as IProduct
  } catch (error) {
    const err = error as AxiosError
    console.log("Error al obtener producto por ID:", err.message)
    return null
  }
}

// GET products by user
export const getProductsByUser = async (userId: string | undefined): Promise<IProduct[] | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/products/${userId}/products`)
    return res.data as IProduct[]
  } catch (error) {
    console.log("Error al obtener productos por usuario:", (error as AxiosError).message)
    return null
  }
}

export const patchProduct = async (
  productId: number | undefined,
  data: Partial<IProduct>
): Promise<IProduct |  {message: string} | {error: unknown}> => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/products/${productId}`, data)
    if (res.status !== 200) {
      return {
        message: "Error al actualizar el producto:",
      }
    }
    return res.data as IProduct
  } catch (error) {
    const err = error as AxiosError
    return {
      message: "Error al actualizar el producto:",
      error: err.response?.data || "Error desconocido",
    }
  }
}