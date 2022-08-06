import axios from "../api/auth-api";
import jwtDecode from "jwt-decode";
import Token from "../types/token";
import { store } from "../app/store";
import { setIsLoggedIn } from "../features/auth/authReducer";
import { AxiosResponse } from "axios";
import {
  getCookieItem,
  deleteCookie,
  setCookieItem,
  clearAuthCookies,
} from "../hooks/useCookie";

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

const refreshToken = (token: string): Promise<AxiosResponse> => {
  return axios.get(`${process.env.REACT_APP_AUTH_API_TOKEN}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAccessToken = (): string => {
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

const getRefreshToken = (): string => {
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

const UpdateToken = (token: string): void => {
  try {
    refreshToken(token)
      .then((res) => {
        // save access token and refresh token to cookie
        const decoded = jwtDecode<Token>(res?.data.access_token);
        setCookieItem("access_token", res?.data.access_token, decoded.exp);
        const decoded2 = jwtDecode<Token>(res?.data.refresh_token);
        setCookieItem("refresh_token", res?.data.refresh_token, decoded2.exp);
        // dispatch action to update isLoggedIn state
        store.dispatch(setIsLoggedIn(true));
      })
      .catch(() => {
        // dispatch action to update isLoggedIn state
        store.dispatch(setIsLoggedIn(false));
      });
  } catch (error) {
    // dispatch action to update isLoggedIn state
    store.dispatch(setIsLoggedIn(false));
  }
};

const CheckRefreshToken = (): void => {
  const refreshToken = getRefreshToken();
  // 1. check refresh token exist or not
  if (refreshToken) {
    // 2. if refresh token exist, check token validity
    try {
      const jwtRefreshToken = jwtDecode<Token>(refreshToken);
      if (jwtRefreshToken?.exp * 1000 >= Date.now()) {
        // 4. if refresh token valid update access token
        UpdateToken(refreshToken);
      } else {
        // refresh refresh token expired
        // 3. if refresh token is not valid, delete refresh token
        clearAuthCookies();
        store.dispatch(setIsLoggedIn(false));
      }
    } catch (error) {
      clearAuthCookies();
      store.dispatch(setIsLoggedIn(false));
    }
  } else {
    // 9. if refresh token is not exist, redirect to login page
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    store.dispatch(setIsLoggedIn(false));
  }
};

const ChecksIsAuthenticated = (): void => {
  const accessToken = getAccessToken();

  // 1. check if access token exist or not
  if (accessToken) {
    // 2. if access token exist, check token validity
    try {
      const jwtAccessToken = jwtDecode<Token>(accessToken);
      if (jwtAccessToken?.exp * 1000 >= Date.now()) {
        // 4. if token is valid store.dispatch login true
        store.dispatch(setIsLoggedIn(true));
      } else {
        // access token expired
        // 3. if token is not valid, delete access token and check refresh  token exist or not
        deleteCookie("access_token");
        CheckRefreshToken();
      }
    } catch (error) {
      CheckRefreshToken();
    }
  } else {
    CheckRefreshToken();
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  ChecksIsAuthenticated,
};
