import axios from "axios";
import userHeader from "./headers/user-header";
import { getCookieItem } from "../hooks/useCookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_USER_API,
  headers: userHeader() as any,
});

instance.interceptors.request.use(
  (config: any) => {
    const accessToken = getCookieItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
      config.headers["X-User-Permission"] = "r";
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { instance };
