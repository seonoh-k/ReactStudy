import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function UnauthenticatedLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return <>{!user && <Outlet />}</>
}