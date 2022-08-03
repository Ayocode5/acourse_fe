import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/organisms/Navbar";

const Layout = () => {
  // get access token from cookie
  // const accessToken = AuthService.getAccessToken();

  // interval expire token
  // const expireAccessToken = 50 * 1000;

  // update access token when interval expire
  // const updateToken = useCallback(async () => {
  //   try {
  //     const response = await AuthService.refreshToken();
  //     if (response.status === 200) {
  //       const decoded = jwtDecode<Token>(response?.data.access_token);
  //       setCookieItem("access_token", response?.data.access_token, decoded.exp);
  //       const decoded2 = jwtDecode<Token>(response?.data.refresh_token);
  //       setCookieItem(
  //         "refresh_token",
  //         response?.data.refresh_token,
  //         decoded2.exp
  //       );
  //       console.log("update token ", response.data);
  //     }
  //   } catch (error) {
  //     deleteCookie("access_token");
  //     deleteCookie("refresh_token");
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     const currentToken = jwtDecode<Token>(accessToken);
  //     if (currentToken.exp * 1000 >= Date.now()) {
  //       console.log("currentToken", currentToken);
  //       updateToken();
  //     }
  //   } catch (error) {}
  // }, [accessToken, expireAccessToken, updateToken]);

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
