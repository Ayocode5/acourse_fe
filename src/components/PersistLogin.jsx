/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRefreshToken from "../hooks/useRefreshToken";
import { selectAuth } from "../config/redux/features/auth/authSlice";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useSelector(selectAuth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
        navigate("/login", {
          state: { from: location },
          replace: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`is loading : ${isLoading}`);
    console.log(`aT : ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}
