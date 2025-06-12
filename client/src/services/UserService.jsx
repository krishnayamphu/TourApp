import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const token = localStorage.getItem("token");
//get users
export const getUsers = async () => {
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get tour by id
export const getTour = async (tourId) => {
  return axios.get(`${API}/tours/${tourId}`);
};

//get tour by slug
export const getTourBySlug = async (slug) => {
  return axios.get(`${API}/tours/slug/${slug}`);
};

//crate a tour
export const createTour = async (tourData) => {
  return axios.post(`${API}/tours`, tourData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//delete a tour
export const deleteTour = async (id) => {
  return axios.delete(`${API}/tours/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
