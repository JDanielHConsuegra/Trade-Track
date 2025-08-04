// front-pf/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Roboto } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/context/authContext";
import { ToastContainer } from "react-toastify";

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
}>) {
  return (
    <html lang="en">
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