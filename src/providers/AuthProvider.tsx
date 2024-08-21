import {
  useGetSessionUserMutation,
} from "@/features/auth";
import { resetAuthStore } from "@/libs/helper";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
