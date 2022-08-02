import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/login"}>Sign In</Link>
        </li>
        <li>
          <Link to={"/register"}>Sign Up</Link>
        </li>
        <li>
          <Link to={"/user/:id"}>User</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
