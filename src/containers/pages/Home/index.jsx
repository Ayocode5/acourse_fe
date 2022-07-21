import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1>Home Screen</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </section>
  );
}
