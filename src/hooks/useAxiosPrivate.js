import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../utils/api-clients";
import useRefreshToken from "./useRefreshToken";
import { selectAuth } from "../config/redux/features/auth/authSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken.access_token}`;
          console.log(prevRequest);
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
