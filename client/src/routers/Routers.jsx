import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Form from "../pages/Form";
import Hook from "../pages/Hook";
import Todo from "../pages/Todo";
import UploadForm from "../pages/UploadForm";
import Media from "../pages/Media";
import Users from "../pages/users/Users";
import Login from "../pages/users/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SignUp from "../pages/auth/SignUp";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forms" element={<Form />} />
        <Route path="/hooks" element={<Hook />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/media" element={<Media />} />
        <Route path="/upload-form" element={<UploadForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Routers;
