import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const token = localStorage.getItem("token");

//crate a tour
export const createReview = async (reviewData) => {
  return axios.post(`${API}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
