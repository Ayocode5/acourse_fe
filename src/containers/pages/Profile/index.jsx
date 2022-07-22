/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Profile() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/user/current", {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data.email);
      } catch (error) {
        console.log(error);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>WELCOME</h1>
      <p>hello {users}</p>

      <Link to="/class">My class</Link>
    </div>
  );
}
