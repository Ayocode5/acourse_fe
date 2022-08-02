import axios from "axios";
import authHeader from "../services/auth-header";

export default axios.create({
  baseURL: process.env.REACT_APP_USER_API,
  headers: authHeader() as any,
});
