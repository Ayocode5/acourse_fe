import React, { useEffect } from "react";
import AuthService from "../../../services/auth.service";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  useEffect(() => {
    AuthService.ChecksIsAuthenticated();
  }, []);

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
export default RequireAuth;
