import React, { useState, useEffect, useCallback } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { setCookieItem, deleteCookie } from "../../../hooks/useCookie";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../features/auth/authReducer";
import AuthService from "../../../services/auth.service";
import Token from "../../../types/token";
import jwtDecode from "jwt-decode";

const RequireAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [acessTokenValid, setAcessTokenValid] = useState(
    AuthService.checkValidityToken()
  );

  const updateToken = useCallback(async () => {
    try {
      const response = await AuthService.refreshToken();
      if (response.status === 200) {
        const decoded = jwtDecode<Token>(response?.data.access_token);
        setCookieItem("access_token", response?.data.access_token, decoded.exp);
        const decoded2 = jwtDecode<Token>(response?.data.refresh_token);
        setCookieItem(
          "refresh_token",
          response?.data.refresh_token,
          decoded2.exp
        );
        console.log("update token ", response.data);
        setAcessTokenValid(true);
        dispatch(setIsLoggedIn(true));
      }
    } catch (error) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      dispatch(setIsLoggedIn(false));
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  // 1. check access token exist or not
  const checkAccessToken = useCallback(() => {
    const accessToken = AuthService.getAccessToken();
    // 2. if access token exist, check token validity
    if (accessToken) {
      const jwtAccessToken = jwtDecode<Token>(accessToken);
      if (jwtAccessToken?.exp * 1000 < Date.now()) {
        // access token expired
        // 3. if token is not valid, delete access token
        deleteCookie("access_token");
        setAcessTokenValid(false);

        // 4. if token is valid, check if user is logged in or not
      } else {
        setAcessTokenValid(true);
        dispatch(setIsLoggedIn(true));
      }
    } else {
      setAcessTokenValid(false);
      // 8. if access token is not exist,  check refresh token exist or not
      const refreshToken = AuthService.getRefreshToken();
      if (refreshToken) {
        updateToken();
      } else {
        // 9. if refresh token is not exist, redirect to login page
        navigate("/login", { replace: true });
      }
    }
  }, [dispatch, navigate, updateToken]);

  useEffect(() => {
    checkAccessToken();
  }, [checkAccessToken]);

  if (acessTokenValid) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
export default RequireAuth;
