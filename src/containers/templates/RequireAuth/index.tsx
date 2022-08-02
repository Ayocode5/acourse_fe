import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getCookieItem } from "../../../hooks/useCookie";

const RequireAuth = () => {
  const accessToken = getCookieItem("access_token");

  if (!accessToken || accessToken === "" || accessToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RequireAuth;
