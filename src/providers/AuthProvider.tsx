import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { reset, setAccountType } = useAuthStore();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAccountType(JSON.parse(user));
    } else {
      reset();
    }
  }, []);

  return children;
}
