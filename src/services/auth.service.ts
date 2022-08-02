/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from "axios";
import axios from "../api/auth-api";
import { getCookieItem } from "../hooks/useCookie";

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

export default { register, login, refreshToken };
