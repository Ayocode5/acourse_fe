/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "../utils/api-clients";
import useRefreshToken from "../hooks/useRefreshToken";
import { logOut } from "../config/redux/features/auth/authSlice";

export default function RequireAuth() {
  const location = useLocation();
  const dispatch = useDispatch();

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const refresh = useRefreshToken();
  console.log(authToken);

  const getUserValidity = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL_AUTH_GET_CURRENT_USER,
        {
          headers: {
            Authorization: `Bearer ${authToken.access_token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        return true;
      }
      dispatch(logOut());
      return false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (authToken) {
        refresh();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [authToken]);

  return authToken && getUserValidity() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
}
