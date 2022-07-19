import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../utils/api-clients";
import { setAuth } from "../../../config/redux/features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL_AUTH_LOGIN,
        JSON.stringify({ email, password: pwd }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
      );
      dispatch(
        setAuth({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        }),
      );
      setEmail("");
      setPwd("");
      setSuccess(true);
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
    <>
      {success ? (
        <section>
          <h1>You are Logged in </h1>
          <br />
          <p>
            <a href="/">Go to home</a>
          </p>
        </section>
      ) : (
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
      )}
    </>
  );
}
