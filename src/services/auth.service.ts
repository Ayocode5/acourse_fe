import axios from "../api/auth-api";
import { AxiosResponse } from "axios";
import { getCookieItem, deleteCookie } from "../hooks/useCookie";
import jwtDecode from "jwt-decode";
import Token from "../types/token";

const register = ({
  username,
  email,
  phone_number,
  password,
}: {
  username: string;
  email: string;
  phone_number: string;
  password: string;
}): Promise<AxiosResponse> => {
  return axios.post(`${process.env.REACT_APP_AUTH_API_REGISTER}`, {
    username,
    email,
    phone_number,
    password,
  });
};

const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return axios.post(
    `${process.env.REACT_APP_AUTH_API_LOGIN}`,
    JSON.stringify({
      email,
      password,
    })
  );
};

const refreshToken = (): Promise<AxiosResponse> => {
  const refreshToken = getRefreshToken();
  return axios.get(`${process.env.REACT_APP_AUTH_API_TOKEN}`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

const checkValidityToken = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  // 2. if access token exist, check token validity
  if (accessToken) {
    console.log("access exist ?", accessToken);
    try {
      const jwtAccessToken = jwtDecode<Token>(accessToken);
      if (jwtAccessToken?.exp * 1000 >= Date.now()) {
        return true;
        // 4. if token is valid, check if user is logged in or not
      } else {
        // access token expired
        // 3. if token is not valid, delete access token
        deleteCookie("access_token");
        return true;
      }
    } catch (error) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      console.log("clear token");
      return false;
    }
  } else if (!accessToken && refreshToken) {
    // 8. if access token is not exist,  check refresh token exist or not
    console.log("ref exist ?", refreshToken);
    try {
      const jwtRefreshToken = jwtDecode<Token>(refreshToken);
      if (jwtRefreshToken?.exp * 1000 >= Date.now()) {
        return true;
      } else {
        // refresh token expired
        // 9. if refresh token is not valid, delete refresh token
        deleteCookie("refresh_token");
        deleteCookie("access_token");
        console.log("clear token");
        return false;
      }
    } catch (err) {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      console.log("clear token");
      return false;
    }
  } else {
    // 9. if refresh token is not exist, redirect to login page
    return false;
  }
};

const getAccessToken = () => {
  const accessToken = getCookieItem("access_token");
  if (
    accessToken ||
    accessToken !== "" ||
    accessToken !== null ||
    accessToken !== undefined
  ) {
    return accessToken;
  } else {
    return "";
  }
};

const getRefreshToken = () => {
  const refreshToken = getCookieItem("refresh_token");
  if (
    refreshToken ||
    refreshToken !== "" ||
    refreshToken !== null ||
    refreshToken !== undefined
  ) {
    return refreshToken;
  } else {
    return "";
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  refreshToken,
  checkValidityToken,
  getAccessToken,
  getRefreshToken,
};
