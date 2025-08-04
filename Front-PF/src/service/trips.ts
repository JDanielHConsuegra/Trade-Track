"use server";

import { CreateProduct, CreateProvider, ICreateTrip, IProduct, IProvider } from "@/types";
import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// GET 
export const getTrips = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/trips/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    return {
      message: "Error al conectar con el servidor: " + err.message,
    };
  }
};
export const getAllTrips = async (token: string) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/trips`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    return {
      message: "Error al conectar con el servidor: " + err.message,
    };
  }
};


export const getTripsById = async (id: string, token: string | null) => {
  
  try {
    const res = await axios.get(`${API_BASE_URL}/trips/${id}/trip`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    return {
      message: "Error al conectar con el servidor: " + err.message,
    };
  }
};

export const putTripsById = async (id: string, token: string | null, values: ICreateTrip) => {

  try {
    const res = await axios.patch(`${API_BASE_URL}/trips/${id}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return {
        message: "Viaje actualizado exitosamente",
        trip: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 400) {
      return {
        message: "Error en los datos enviados",
      };
    }
    else {
      return {
        message: "Error al conectar con el servidor: " + err.message,
      };
    }
  }
};

export const getTripsProviders = async (id: string, token: string | null) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/trips/${id}/providers`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data as IProvider[];
  } catch (error) {
    const err = error as AxiosError;
    return err
  }
};

export const getTripsProducts = async (id: string, token: string | null) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/trips/${id}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data as IProduct[];
  } catch (error) {
    const err = error as AxiosError;
    return {
      message: "Error al conectar con el servidor: ",
      error: err.response?.data || "Unknown error"
    }
  }
};

//POST
export const createTripsProducts = async (
  id: string,
  values: CreateProduct,
  token: string | null
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/trips/${id}/products`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      return {
        message: "Producto creado exitosamente",
        product: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 400) {
      return {
        message: "Ya hay un producto con ese nombre o hay un problema con los datos enviados",
      };
    }
    if (err.response?.status === 500) {
      return {
        message: "Error interno del servidor",
      };

    }
    else {
      return {
        message: "Error al conectar con el servidor: "
      };
    }
  }
};



export const createTripsProviders = async (
  id: string,
  values: CreateProvider,
  token: string | null
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/trips/${id}/providers`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      return {
        message: "Proveedor creado exitosamente",
        provider: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.response?.status === 400) {
      return {
        message: "Ya hay un proveedor con ese nombre o hay un problema con los datos enviados",
      };
    }
    if (err.response?.status === 500) {
      return {
        message: "Error interno del servidor",
      };

    }
    else {
      return {
        message: "Error al conectar con el servidor: " + err.message,
      };
    }
  }
};

export const createTrip = async (
  values: ICreateTrip,
  userId: string | undefined,
  token: string | null
) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/trips/${userId}`, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      return {
        message: "Viaje creado exitosamente",
        trip: res.data,
      };
    }
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 400) {
      return {
        message: "Ya hay un viaje con ese nombre",
      };
    }

    return {
      message: "Error al conectar con el servidor: " + err.message,
    };
  }
};



