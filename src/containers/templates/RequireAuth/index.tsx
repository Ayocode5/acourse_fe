import React, { useEffect } from "react";
import AuthService from "../../../services/auth.service";
import axios from "../../../api/user-api";
import { Outlet, Navigate } from "react-router-dom";
import { setCurrentUser } from "../../../features/auth/authReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";

export default function RequireAuth() {
  const { isLoggedIn } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  const getDataUser = async () => {
    try {
      const res = await axios.instance.get(
        `${process.env.REACT_APP_USER_API_CURRENT}`
      );
      if (res?.status === 200) {
        dispatch(setCurrentUser(res?.data));
      }
    } catch (error) {
      console.log("session expired");
    }
  };

  useEffect(() => {
    AuthService.ChecksIsAuthenticated();
    getDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
}
