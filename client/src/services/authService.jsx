// src/services/authService.js
import axios from "axios";

const API = "http://localhost:3000/api/auth";

// export const registerUser = (userData) =>
//   axios.post(`${API}/register`, userData);
export const loginUser = (credentials) =>
  axios.post(`${API}/login`, credentials);

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
