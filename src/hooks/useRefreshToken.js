/* eslint-disable camelcase */
import { useDispatch } from "react-redux";
import axios from "../utils/api-clients";
import {
  logOut,
  setCredentials,
} from "../config/redux/features/auth/authSlice";

const useRefreshToken = () => {
  // get auth credentials from redux store
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("authToken"));
  const refreshToken = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL_AUTH_GET_REFRESH_TOKEN,
      {
        headers: {
          Authorization: `Bearer ${auth.refresh_token}`,
        },
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      // Set the new tokens in the redux store
      dispatch(
        setCredentials({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        }),
      );
      localStorage.setItem("authToken", JSON.stringify(response.data));
    } else {
      dispatch(logOut());
    }
    // retruning object {access_token, refresh_token}
    return response.data;
  };

  return refreshToken;
};

export default useRefreshToken;
