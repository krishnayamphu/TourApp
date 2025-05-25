import { Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Signin from "../pages/auth/Signin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Tours from "../pages/admin/tours/Tours";
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Route>

      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

      {/* <Route element={<RoleProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<UserDashboard />} />
      </Route> */}

      {/* Admin routes - all protected */}
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tours" element={<Tours />} />
        {/* <Route path="users" element={<Users />} /> */}
      </Route>
    </Routes>
  );
};

export default Routers;
