import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const token = localStorage.getItem("token");

//get bookings
export const getBookings = async () => {
  return axios.get(`${API}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get booking by id
export const getBooking = async (bookingId) => {
  return axios.get(`${API}/bookings/${bookingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get booking by userId
export const getBookingByUserId = async (userId) => {
  return axios.get(`${API}/bookings/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//crate a booking
export const createBooking = async (bookingData) => {
  if (!token) return "token not set";
  return axios.post(`${API}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//update booking by id
export const updateBooking = async (bookingId, status) => {
  return axios.put(
    `${API}/bookings/status/${bookingId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

//update booking status by id
export const updateBookingStatus = async (bookingId, status) => {
  return axios.put(
    `${API}/bookings/status/${bookingId}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
