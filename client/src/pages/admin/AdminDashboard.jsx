import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminDashboard() {
  return (
    <div className="w-2/3 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
