import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_AUTH,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
