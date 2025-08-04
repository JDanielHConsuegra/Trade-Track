// src/service/user.ts
"use server";

import { IUser } from "@/types";
import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const GetUser = async () => {
  console.log("🔍 [DEBUG] GetUser ejecutándose desde:", new Error().stack);
  try {
    const res = await axios.get(`${API_BASE_URL}/users`);

    if (res.status === 200) {
      return {
        message: "Usuarios obtenidos exitosamente",
        users: res.data as IUser[]
      };
    } else {
      return {
        message: "Algo inesperado ha ocurrido al obtener los usuarios",
      };
    }
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409) {
      return {
        message: "Ese usuario ya existe, intenta con otro correo",
        error: err.response.data,
      };
    }
    return {
      message: "Error al conectar con el servidor",
    };
  }
};
export const GetUserById = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/${id}`);

    if (res.status === 200) {
      return res.data as IUser;
    } else {
      return {
        message: "Algo inesperado ha ocurrido al obtener el usuario",
      };
    }
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409) {
      return {
        message: "Ese usuario ya existe, intenta con otro correo",
        error: err.response.data,
      };
    }
    return {
      message: "Error al conectar con el servidor",
    };
  }
};

// Modificacion de Usuarios
export const patchLogin = async (data: Partial<IUser>, id: string | undefined) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/users/${id}`, data);
    
    if (res.status === 200) {
      return {
        message: "Usuario Modificado exitosamente",
        data: res.data,
      };
    } else {      
      return {
        message: "Algo inesperado ha ocurrido al modificar el usuario",
        error: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 400) {
      
      return {
        message: "Error al modificar el usuario por datos incorrectos",
        error: err.response.data,
      };
    }
    
    return {
      message: "Error al conectar con el servidor",
      error: err.response?.data || "Error desconocido",
    };
  }
};

//agregar foto de perfil
export const uploadProfileImage = async (file: FormData, userId: string | undefined) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/files/uploadImage/${userId}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (res.status === 201) {
      return {
        message: "Foto de perfil actualizada exitosamente",
        data: res.data,
      };
    } else {
      return {
        message: "Error al actualizar la foto de perfil",
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    return {
      message: "Error al conectar con el servidor",
      error: err.response?.data || "Error desconocido",
    };
  }
};