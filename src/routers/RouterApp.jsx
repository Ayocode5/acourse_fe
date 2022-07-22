import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Profile,
  Class,
  NotFound,
} from "../containers/pages";
import Layout from "../components/Layout";
import RequireAuth from "./RequireAuth";
// import PersistLogin from "../components/PersistLogin";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect Route */}
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/class" element={<Class />} />
          </Route>

          {/* Catch all */}
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
