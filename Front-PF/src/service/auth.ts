// src/service/auth.ts
import axios, { AxiosError } from "axios";

import { IUserLogin, IUserRegister } from "@/types";

interface Response {
  message: string;
  data?: unknown;
  error?: unknown;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const postRegister = async (data: IUserRegister): Promise<Response> => {
  
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    

    if (res.status === 201 || res.status === 200) {
      return {
        message: "Usuario registrado exitosamente",
        data: res.data,
      };
    } else {
      return {
        message: "Algo inesperado ha ocurrido al registrar el usuario",
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
      error: err,
    };
  }
};

// Inicio de sesión
export const postLogin = async (data: IUserLogin): Promise<Response> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
    
    if (res.status === 201 || res.status === 200) {
      return {
        message: "Usuario logeado exitosamente",
        data: res.data,
      };
    } else {
      return {
        message: "Algo inesperado ha ocurrido al logear el usuario",
        error: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      return {
        message: "Verifica tanto el usuario como la contraseña",
        error: err.response.data,
      };
    }
    return {
      message: "Error al conectar con el servidor - DESDE POSTLOGIN", // ← Cambia este mensaje temporalmente
    };
  }
};