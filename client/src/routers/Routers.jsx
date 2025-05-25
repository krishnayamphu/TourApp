import { Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Signin from "../pages/auth/Signin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Tours from "../pages/admin/tours/Tours";
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute";
import Users from "../pages/admin/users/Users";
import Bookings from "../pages/admin/bookings/Bookings";

const Routers = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<Signin />} />
      </Route>

      {/* Optional Unauthorized Route */}
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

      {/* Protected Admin Layout */}
      <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="tours" element={<Tours />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
