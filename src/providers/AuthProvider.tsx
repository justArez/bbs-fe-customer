import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { reset } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = jwtDecode(token);
      console.log(data);
    } else {
      reset();
    }
  }, []);

  return children;
}
