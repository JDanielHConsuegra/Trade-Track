import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";

export const Public = () => {
  const { isAuth, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuth) {
      router.push("/");
    }
  }, [isAuth, loading, router]);

  return null;
};