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
  const refreshToken = getCookieItem("refresh_token");
  return axios.get(`${process.env.REACT_APP_AUTH_API_TOKEN}`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};

const checkValidityToken = (): boolean => {
  const accessToken = getAccessToken();
  try {
    const jwtDecodeAccessToken = jwtDecode<Token>(accessToken);
    if (jwtDecodeAccessToken?.exp * 1000 >= Date.now()) {
      return true;
    } else {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      return false;
    }
  } catch (error) {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
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
