import axios from "axios";
import userHeader from "./headers/user-header";

export default axios.create({
  baseURL: process.env.REACT_APP_USER_API,
  headers: userHeader() as any,
});
