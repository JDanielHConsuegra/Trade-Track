// hooks/UsePrivate.tsx
"use client";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UsePrivate = () => {
  const router = useRouter();
  const { isAuth, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && isAuth === false) {
      router.push("/login");
    }
  }, [isAuth, loading, router]);

  return null;
};

export default UsePrivate;