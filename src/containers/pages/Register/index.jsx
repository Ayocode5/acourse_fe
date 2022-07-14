import React, { useState, useEffect, useRef } from "react";
import { IoInformationCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../../../utils/api-clients";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // regex for username
const PHONE_NUMBER_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // regex for password
export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumb, setPhoneNumb] = useState("");
  const [validPhoneNumb, setValidPhoneNumb] = useState(false);
  const [phoneNumbFocus, setPhoneNumbFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumb(PHONE_NUMBER_REGEX.test(phoneNumb));
  }, [phoneNumb]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with js hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONE_NUMBER_REGEX.test(phoneNumb);
    const v4 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL_AUTH_REGISTER,
        JSON.stringify({
          username: user,
          password: pwd,
          email,
          phone_number: phoneNumb,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // eslint-disable-next-line
      console.log(pwd, user, email);
      console.log(response.data);
      // eslint-disable-next-line
      console.log(response.accessToken);
      // eslint-disable-next-line
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err?.response.status === 409) {
        setErrMsg("Username has already taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/login">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <label htmlFor="username">
              Username :
              <span className={validName ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              ref={userRef}
              autoComplete="off"
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <IoInformationCircle />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underScores, hyphens, allowed.
            </p>

            {/* Email Input */}
            <label htmlFor="email">
              Email :
              <span className={validEmail ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <IoInformationCircle />
              example : jhonDoe@gmail.com
              <br />
              There must be @ there
            </p>

            {/* Phone Number Input */}
            <label htmlFor="phoneNumb">
              Phone Number :
              <span className={validPhoneNumb ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span
                className={validPhoneNumb || !phoneNumb ? "hide" : "invalid"}
              >
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="tel"
              name="phoneNumb"
              id="phoneNumb"
              required
              aria-invalid={validPhoneNumb ? "false" : "true"}
              aria-describedby="phonenote"
              onChange={(e) => setPhoneNumb(e.target.value)}
              onFocus={() => setPhoneNumbFocus(true)}
              onBlur={() => setPhoneNumbFocus(false)}
            />
            <p
              id="phonenote"
              className={
                phoneNumbFocus && phoneNumb && !validPhoneNumb
                  ? "instructions"
                  : "offscreen"
              }
            >
              <IoInformationCircle />
              example : 0812345678912 or +62812345678912
              <br />
              Maximum 15 digits
            </p>

            {/* Password Input */}
            <label htmlFor="password">
              Password :
              <span className={validPwd ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <IoInformationCircle />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters :
              <span aria-label="exclamation-mark"> ! </span>
              <span aria-label="at symbol">@ </span>
              <span aria-label="hastag"># </span>
              <span aria-label="dollar sign">$ </span>
              <span aria-label="percent">%</span>.
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password :
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              name="confirm_pwd"
              id="confirm_pwd"
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <IoInformationCircle />
              Must match the first password input field
            </p>

            <button
              type="submit"
              disabled={!!(!validName || !validPwd || !validMatch)}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <a href="/login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
