// front-pf/src/app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/context/authContext";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "PF",
  description: "By Juan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html className="w-full" lang="en">
      <body className={`${poppins.className} ${roboto.className}`}>
        <AuthProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="auto"
            limit={5}
            toastStyle={{
              fontSize: '16px',
              fontFamily: 'inherit',
              fontWeight: '700',
              // gray-200 from Tailwind
              backgroundColor: "#172657", // blue-900 from Tailwind
            }}
          />
        </AuthProvider>
        
        
      </body>
    </html>
  );
}