/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Profile() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(
          "/api/user/all?limit=5&page=1",
          {
            signal: controller.signal,
          },
        );
        console.log(response.data.data);
        isMounted && setUsers(response.data.data);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>WELCOME</h1>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.email}</li>
          ))}
        </ul>
      ) : (
        <p>No User to display</p>
      )}

      <Link to="/class">My class</Link>
    </div>
  );
}
