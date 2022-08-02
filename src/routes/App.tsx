import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../containers/templates/Layout";
import Home from "../containers/pages/Home";
import Login from "../containers/pages/Login";
import Register from "../containers/pages/Register";
import NotFound from "../containers/pages/404";
import RequireAuth from "../containers/templates/RequireAuth";
import Profile from "../containers/pages/Profile";

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Private Auth */}
        <Route path="/user" element={<RequireAuth />}>
          <Route path=":id" element={<Profile />} />
          <Route path="setting:id" />
          <Route path="my-class:id" />
        </Route>

        {/* Catch all route */}
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
