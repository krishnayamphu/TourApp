import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

//get tours
export const getTours = async () => {
  return axios.get(`${API}/tours`);
};

//get tours
export const deleteTour = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API}/tours/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
