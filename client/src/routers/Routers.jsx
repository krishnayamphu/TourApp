import { Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import SignUp from "../pages/auth/SignUp";
import Signin from "../pages/auth/Signin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TourCreate from "../pages/admin/tours/TourCreate";
import Tours from "../pages/admin/tours/Tours";
import RoleProtectedRoute from "../components/auth/RoleProtectedRoute";
import Users from "../pages/admin/users/Users";
import Bookings from "../pages/admin/bookings/Bookings";
import Tour from "../pages/Tour";
import Booking from "../pages/booking/Booking";
import MyBooking from "../pages/MyBooking";

const Routers = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<Signin />} />

        {/* <Route path="tour/:id" element={<Tour />} /> */}
        <Route path="tour/:slug" element={<Tour />} />
      </Route>

      {/* Optional Unauthorized Route */}
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

      {/* Protected Layout */}
      <Route element={<RoleProtectedRoute allowedRoles={["admin", "user"]} />}>
        <Route path="/" element={<AppLayout />}>
          <Route path="my-booking" element={<MyBooking />} />
          <Route path="booking/:id" element={<Booking />} />
        </Route>
      </Route>

      {/* Protected Admin Layout */}
      <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="tours/create" element={<TourCreate />} />
          <Route path="tours" element={<Tours />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;
