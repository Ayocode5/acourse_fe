import React, { useState, useEffect, useRef } from "react";
import AuthService from "../../../services/auth.service";
import registerRegex from "../../../utils/regex";
import { IoInformationCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaTimesCircle } from "react-icons/fa";

import "./index.css";

const Register = (): JSX.Element => {
  const { USER_REGEX, PWD_REGEX, EMAIL_REGEX, PHONE_NUMBER_REGEX } =
    registerRegex;

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState<string>("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState<string>("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState(false);

  useEffect((): void => {
    userRef.current?.focus();
  }, []);

  useEffect((): void => {
    setValidUsername(USER_REGEX.test(username));
  }, [USER_REGEX, username]);

  useEffect((): void => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [EMAIL_REGEX, email]);

  useEffect((): void => {
    setValidPhone(PHONE_NUMBER_REGEX.test(phone));
  }, [PHONE_NUMBER_REGEX, phone]);

  useEffect((): void => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [PWD_REGEX, password, matchPwd]);

  useEffect((): void => {
    setErrMsg("");
  }, [username, email, password, matchPwd]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // recheck again the input valid and chack if button enabled with js hack
    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONE_NUMBER_REGEX.test(phone);
    const v4 = PWD_REGEX.test(password);
    const v5 = password === matchPwd;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry Input");
      return;
    }

    try {
      const data = {
        username,
        name,
        email,
        password,
        phone_number: phone,
      };
      const res = await AuthService.register(data);
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error?.response.status === 409) {
        setErrMsg("Username has already taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
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
        <section id="register" className="register section-container">
          <h1>Register</h1>

          <form className="register__form" onSubmit={handleSubmit}>
            <p ref={errRef}>{errMsg}</p>
            <label htmlFor="username">
              Username :
              <span className={validUsername ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validUsername || !username ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              ref={userRef}
              required
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="username-note"
              onChange={(e): void => setUsername(e.target.value)}
              onFocus={(): void => setUsernameFocus(true)}
              onBlur={(): void => setUsernameFocus(false)}
            />
            <p
              id="username-note"
              className={
                usernameFocus && username && !validUsername
                  ? "instruction"
                  : "hide"
              }
            >
              <IoInformationCircle />
              length : 4 to 24 characters
            </p>

            <label htmlFor="name">Name : </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              onChange={(e): void => setName(e.target.value)}
            />

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
              required
              name="email"
              id="email"
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="email-note"
              onChange={(e): void => setEmail(e.target.value)}
              onFocus={(): void => setEmailFocus(true)}
              onBlur={(): void => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={emailFocus && email && !validEmail ? "valid" : "hide"}
            >
              <IoInformationCircle />
              example : jhonDoe@gmail.com
              <br />
              There must be @ there
            </p>

            <label htmlFor="phone">
              Phone :
              <span className={validPhone ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validPhone || !phone ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="phone-note"
              onChange={(e): void => setPhone(e.target.value)}
              onFocus={(): void => setPhoneFocus(true)}
              onBlur={(): void => setPhoneFocus(false)}
            />
            <p
              id="phone-note"
              className={phoneFocus && phone && !validPhone ? "valid" : "hide"}
            >
              <IoInformationCircle />
              example : 0812345678912 or +62812345678912
              <br />
              Maximum 15 digits
            </p>
            <label htmlFor="password">
              Password :
              <span className={validPassword ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="password-note"
              onChange={(e): void => setPassword(e.target.value)}
              onFocus={(): void => setPasswordFocus(true)}
              onBlur={(): void => setPasswordFocus(false)}
            />
            <p
              id="password-note"
              className={
                passwordFocus && !validPassword ? "instruction" : "hide"
              }
            >
              <IoInformationCircle />
              length : 8 to 24 characters
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters :
              <span aria-label="exclamation-mark"> ! </span>
              <span aria-label="at symbol"> @ </span>
              <span aria-label="hastag"> # </span>
              <span aria-label="dollar signin"> $ </span>
              <span aria-label="percent"> % </span>
            </p>

            <label htmlFor="matchPassword">
              Match Password :
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <IoCheckmarkCircleOutline />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              required
              name="matchPassword"
              id="matchPassword"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchPassword-note"
              onChange={(e): void => setMatchPwd(e.target.value)}
              onFocus={(): void => setMatchFocus(true)}
              onBlur={(): void => setMatchFocus(false)}
            />

            <p
              id="matchPassword-note"
              className={matchFocus && !validMatch ? "valid" : "hide"}
            >
              *Must same with password
            </p>
            <button
              disabled={
                !!(
                  !validEmail ||
                  !validPassword ||
                  !validMatch ||
                  !username ||
                  !validPhone
                )
              }
              type="submit"
            >
              Register
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
