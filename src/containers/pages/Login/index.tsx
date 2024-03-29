import React, { useRef, useState } from "react";
import Token from "../../../types/token";
import jwt_decode from "jwt-decode";
import AuthService from "../../../services/auth.service";
import { Navigate, useNavigate } from "react-router-dom";
import { setCookieItem } from "../../../hooks/useCookie";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../../features/auth/authReducer";

import "./index.css";

const Login = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // get state from redux store
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await AuthService.login({ email, password });
      if (res.status === 200) {
        const jwtAccessToken = jwt_decode<Token>(res?.data.access_token);
        const jwtRefreshToken = jwt_decode<Token>(res?.data.refresh_token);
        setCookieItem(
          "access_token",
          res?.data.access_token,
          jwtAccessToken?.exp
        );
        setCookieItem(
          "refresh_token",
          res?.data.refresh_token,
          jwtRefreshToken?.exp
        );
        dispatch(setIsLoggedIn(true));
        navigate("/user/1", { replace: true });
        // window.location.href = "/user/1";
      }
    } catch (error: any) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        setErrorMsg("Unathorized");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

  // if logged in, redirect to user profile page
  if (isLoggedIn) {
    return <Navigate to="/user/1" />;
  }

  return (
    <section id="login" className="login section-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login__form">
        {errorMsg && (
          <p ref={errorRef} className="error">
            {errorMsg}
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          ref={emailRef}
          autoComplete="off"
          placeholder="example@mail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
