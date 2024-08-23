import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const WithAuthencation = () => {
  const { reset, accountType } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const roleId = accountType?.role?.id;

  useEffect(() => {
    if (!token || token.length === 0) {
      reset();
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, token, roleId]);

  return <>{token && token.length > 0 && <Outlet></Outlet>}</>;
};

export default WithAuthencation;
