"use client"
import "../globals.css";
import React, { useEffect, useState } from "react";
import { Poppins, Roboto } from 'next/font/google'

import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from "@/components/sideBar";
import { Private } from "@/components/Private";
import {useAuthContext } from "@/context/authContext";
import { Title } from "@/components/Title";
import { Loading } from "@/components/loading";

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


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <div className={`${poppins.className} ${roboto.className}`}>
      <ClientOnly>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </ClientOnly>
    </div>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }): React.ReactNode {
  const { loading } = useAuthContext();
  if (loading) {
    return <Loading text="Cargando Dashboard..." />;
  }
  return (
    <>
      <Private />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Title />
          {children}
        </div>
      </div>
    </>
  );
}

// ClientOnly component to ensure children only render on client
function ClientOnly({ children }: { children: React.ReactNode }): React.ReactNode {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
}
