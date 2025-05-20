import React, { createContext, useState, useEffect } from "react";
import { getProfile, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile()
        .then((res) => setUser(res.data))
        .catch(() => handleLogout());
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
