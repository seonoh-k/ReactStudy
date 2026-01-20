import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function AuthenticatedLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [navigate, user]);

  return <>{user && <Outlet />}</>
}