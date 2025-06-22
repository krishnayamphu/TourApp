import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const token = localStorage.getItem("token");

//get notifications
export const getNotifications = async () => {
  return axios.get(`${API}/notify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get unread notifications
export const getUnReadNotifications = async () => {
  return axios.get(`${API}/notify/unread`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//get unread notifications by userId
export const getUnReadNotificationsByUserId = async (userId) => {
  return axios.get(`${API}/notify/unread/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

//crate a notification
export const createNotification = async (notificationData) => {
  if (!token) return "token not set";
  return axios.post(`${API}/notify`, notificationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
