/* eslint-disable camelcase */
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/api-clients";
import {
  setCredentials,
  selectAuth,
} from "../config/redux/features/auth/authSlice";

const useRefreshToken = () => {
  // get auth credentials from redux store
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const refreshToken = async () => {
    const response = await axios.get(
      process.env.REACT_APP_APU_URL_AUTH_GET_REFRESH_TOKEN,
      {
        headers: {
          Authorization: `Bearer ${auth.refreshToken}`,
        },
        withCredentials: true,
      },
    );

    // eslint-disable-next-line
    console.log("old token", auth);
    // eslint-disable-next-line
    console.log("new token", response.data);

    // Set the new tokens in the redux store
    dispatch(
      setCredentials({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      }),
    );

    // retruning object {access_token, refresh_token}
    return response.data;
  };

  return refreshToken;
};

export default useRefreshToken;
