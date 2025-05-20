import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_pic: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.id === "profile_pic") {
      setUser({
        ...user,
        [e.target.id]: e.target.files[0], // Store the file object
      });
    } else {
      setUser({
        ...user,
        [e.target.id]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if (user.profile_pic) {
      formData.append("profile_pic", user.profile_pic);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", res.data);
      // Handle successful registration (redirect, show message, etc.)
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-2/3 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <h3 className="mb-4 border-b border-gray-200">Sign Up</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex flex-col gap-2">
        <input
          id="username"
          className="border p-1"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          id="email"
          className="border p-1"
          type="email" // Changed to email type for better validation
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
        <input
          id="password"
          className="border p-1"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        <input
          id="confirmPassword"
          className="border p-1"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.confirmPassword}
        />
        <input
          onChange={handleChange}
          id="profile_pic"
          className="border p-1"
          type="file"
          accept="image/*" // Only accept image files
        />
        <button
          onClick={onSubmit}
          className="p-1 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
