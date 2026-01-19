"use client";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ButtonRed } from "@/components/buttonRed";
import { Private } from "@/components/Private";
import { useParams } from "next/navigation";

// Opcional: validaciones simples con Yup
const validationSchema = Yup.object({
  descargarFotos: Yup.boolean(),
  estadoArchivos: Yup.object({
    todas: Yup.boolean(),
    aprobados: Yup.boolean(),
    pendientes: Yup.boolean(),
    cancelados: Yup.boolean()
  }),
  tipoArchivo: Yup.object({
    pdf: Yup.boolean(),
    excel: Yup.boolean()
  })
});

export default function ArchivoViaje() {

  useParams();
  
  return (
    <div className="min-h-screen mt-4 bg-white">
      <Private/>
      <Navbar title={`Archivo de Viaje`}/>
      <Formik
        initialValues={{
          descargarFotos: false,
          estadoArchivos: {
            todas: false,
            aprobados: false,
            pendientes: false,
            cancelados: false
          },
          tipoArchivo: {
            PDF: false,
            Excel: false
          }
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          toast.success("Descarga iniciada");
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="max-w-xl mx-auto p-4">
            <div className="flex items-center justify-between mb-6 bg-gray-100 p-5">
              <label className="font-semibold flex items-center font-[Poppins]">
                • Descargar todas las fotos
              </label>
              <ButtonRed text="Descargar" />
            </div>

            <div className="bg-gray-100 rounded-xl p-6 shadow">
              <p className="font-semibold font-[Poppins] mb-4">• Descargar archivos</p>
              <div className="flex gap-4 mb-4">
                {Object.keys(values.estadoArchivos).map((key) => (
                  <label key={key} className="capitalize flex flex-col-reverse items-center  font-[Roboto] ">
                    <Field
                      type="checkbox"
                      name={`estadoArchivos.${key}`}
                      className="accent-yellow-400 w-4 h-4"
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>

              <p className="font-semibold font-[Poppins] mb-2 mt-4">• Tipo de archivo</p>
              <div className="flex gap-8 mb-4">
                {Object.keys(values.tipoArchivo).map((key) => (
                  <label key={key} className="capitalize flex flex-col-reverse items-center gap-1 text-base">
                    <Field
                      type="checkbox"
                      name={`tipoArchivo.${key}`}
                      className="accent-yellow-400 w-3 h-3"
                    />
                    {key}
                  </label>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <ButtonRed text="Descargar" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}