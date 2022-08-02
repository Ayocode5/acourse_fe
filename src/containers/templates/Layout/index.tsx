import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/organisms/Navbar";
import useCookie, { setCookieItem } from "../../../hooks/useCookie";
import AuthService from "../../../services/auth.service";
import jwtDecode from "jwt-decode";
import Token from "../../../types/token";

const Layout = () => {
  const [accesToken, setAccessToken] = useCookie("access_token", "");
  const expireAccessToken = 50 * 1000;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateToken = async () => {
    try {
      const response = await AuthService.refreshToken();
      if (response.status === 200) {
        const decoded = jwtDecode<Token>(response?.data.access_token);
        const decoded2 = jwtDecode<Token>(response?.data.refresh_token);
        setAccessToken(response.data.access_token, decoded.exp);
        setCookieItem(
          "refresh_token",
          response?.data.refresh_token,
          decoded2.exp
        );
        console.log("update token ", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accesToken !== "") {
      const interval = setInterval(() => {
        updateToken();
      }, expireAccessToken);

      return () => clearInterval(interval);
    }
  }, [accesToken, expireAccessToken, setAccessToken, updateToken]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
