import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Users() {
  return (
    <div className="p-4">
      <h1>All Users</h1>
    </div>
  );
}
