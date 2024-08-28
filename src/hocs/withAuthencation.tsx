import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const WithAuthencation = () => {
  const { reset, accountType } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("user");
  const roleId = accountType;

  useEffect(() => {
    if (!user) {
      reset();
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user, roleId]);

  return <>{user && user.length > 0 && <Outlet></Outlet>}</>;
};

export default WithAuthencation;
