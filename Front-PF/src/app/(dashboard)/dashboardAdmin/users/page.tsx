'use client';
import React, { useState, useEffect } from "react";
import { NotFound } from "@/components/notFound";
import { Private } from "@/components/Private";
import { IUser } from "@/types";
import { SearchDash } from "@/components/searchDash";
import { GetUser } from "@/service/user";
import { ContainerUserDash } from "@/components/ContainerUserDash";
import { useAuthContext } from "@/context/authContext";
import { Loading } from "@/components/loading";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<IUser[]>([])
  const { modificacion } = useAuthContext();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
        const fetchUsers = async () => {
                const data = await GetUser();
                setUsers(Array.isArray(data.users) ? data.users : []);
                setLoading(false);
        };
        fetchUsers();
    }, [modificacion]);

    if (loading) return <Loading text="Cargando Usuarios..." />;

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Users:", filteredUsers);


  return (
    <section className="flex flex-col justify-start min-h-screen p-3">
      <Private />
      <h1 className="text-3xl font-bold text-center p-5 shadow-md bg-gray-50 mb-4">Filtra los Usuarios, por nombre y Email</h1>
      <SearchDash onSearch={setSearchTerm} />

      <div className="flex flex-col">
        {filteredUsers.length > 0 ? (
  <ContainerUserDash data={filteredUsers} />
) : (
  <NotFound text="No hay usuarios que coincidan con tu búsqueda." />
)}
      </div>
    </section>
  );
}