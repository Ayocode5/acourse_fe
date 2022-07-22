import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../utils/api-clients";
import { setCredentials } from "../../../config/redux/features/auth/authSlice";

export default function Login() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const authToken = JSON.parse(localStorage.getItem("authToken")) || null;

  useEffect(() => {
    if (authToken) {
      navigate(from, { replace: true });
      return;
    }
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL_AUTH_LOGIN,
        JSON.stringify({
          email,
          password: pwd,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        dispatch(
          setCredentials({
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          }),
        );
        if (res.data) {
          localStorage.setItem("authToken", JSON.stringify(res?.data));
        }
        setEmail("");
        setPwd("");
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertlive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          placeholder="jhon@gmail.com"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <a href="/register">Sign Up</a>
        </span>
      </p>
    </section>
  );
}
