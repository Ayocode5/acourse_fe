import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();
  console.log(location);
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
}
