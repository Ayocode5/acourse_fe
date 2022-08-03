import React, { useState, useEffect, useCallback } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { setCookieItem, deleteCookie } from "../../../hooks/useCookie";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../features/auth/authReducer";
import AuthService from "../../../services/auth.service";
import Token from "../../../types/token";
import jwtDecode from "jwt-decode";

const RequireAuth = () => {
  const [acessTokenValid, setAcessTokenValid] = useState(
    AuthService.checkValidityToken()
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateToken = async () => {
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
      console.log("clear cokie");
      dispatch(setIsLoggedIn(false));
      navigate("/login", { replace: true });
    }
  };

  const checkAccessToken = useCallback(() => {
    // 1. check access token & refresh exist or not
    const accessToken = AuthService.getAccessToken();
    const refreshToken = AuthService.getRefreshToken();

    // 2. if access token exist, check token validity
    if (accessToken) {
      console.log("access exist ?", accessToken);
      try {
        const jwtAccessToken = jwtDecode<Token>(accessToken);
        if (jwtAccessToken?.exp * 1000 >= Date.now()) {
          setAcessTokenValid(true);
          dispatch(setIsLoggedIn(true));
          // 4. if token is valid, check if user is logged in or not
        } else {
          // access token expired
          // 3. if token is not valid, delete access token
          deleteCookie("access_token");
          setAcessTokenValid(false);
          dispatch(setIsLoggedIn(false));
        }
      } catch (error) {}
    } else if (!accessToken || !acessTokenValid || refreshToken) {
      // 8. if access token is not exist,  check refresh token exist or not
      console.log("ref exist ?", refreshToken);
      try {
        const jwtRefreshToken = jwtDecode<Token>(refreshToken);
        if (jwtRefreshToken?.exp * 1000 >= Date.now()) {
          updateToken();
        } else {
          deleteCookie("refresh_token");
          deleteCookie("access_token");
          dispatch(setIsLoggedIn(false));
          setAcessTokenValid(false);
          console.log("clear token");
        }
      } catch (err) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        console.log("clear token");
        setAcessTokenValid(false);
        dispatch(setIsLoggedIn(false));
        navigate("/login", { replace: true });
      }
    } else {
      // 9. if refresh token and access token is not exist, redirect to login page
      setAcessTokenValid(false);
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acessTokenValid]);

  useEffect(() => {
    checkAccessToken();
  }, [checkAccessToken]);

  if (acessTokenValid) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};
export default RequireAuth;
