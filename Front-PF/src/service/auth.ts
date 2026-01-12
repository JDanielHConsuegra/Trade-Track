// src/service/auth.ts

import { IUserLogin, IUserRegister } from "@/types";
import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const postRegister = async (data: IUserRegister) => {
  console.log("🔍 [DEBUG] Iniciando postRegister con:", data);
  console.log("🔍 [DEBUG] Haciendo petición a:", `${API_BASE_URL}/auth/register`);
  
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log("🔍 [DEBUG] Respuesta recibida:", res.status, res.data);

    if (res.status === 201 || res.status === 200) {
      return {
        message: "Usuario registrado exitosamente",
        data: res.data,
      };
    } else {
      console.log("🔍 [DEBUG] Status inesperado:", res.status);
      return {
        message: "Algo inesperado ha ocurrido al registrar el usuario",
      };
    }
  } catch (error) {
    console.error("❌ [DEBUG] Error en postRegister:", error);
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
export const postLogin = async (data: IUserLogin) => {
  console.log("🔍 [DEBUG] Iniciando postLogin con:", data);
  try {
    console.log("🔍 [DEBUG] Haciendo petición a:", `${API_BASE_URL}/auth/login`);
    const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
    console.log("🔍 [DEBUG] Respuesta recibida:", res.status, res.data);
    
    if (res.status === 201 || res.status === 200) {
      return {
        message: "Usuario logeado exitosamente",
        data: res.data,
      };
    } else {
      console.log("🔍 [DEBUG] Status inesperado:", res.status);
      return {
        message: "Algo inesperado ha ocurrido al logear el usuario",
        error: res.data,
      };
    }
  } catch (error) {
    console.error("❌ [DEBUG] Error en postLogin:", error);
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