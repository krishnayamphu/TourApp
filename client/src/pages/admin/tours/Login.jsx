import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProfile, loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      const profileRes = await getProfile();
      setUser(profileRes.data);
      navigate("/users");
      // console.log("Login successful:", res.data);
    } catch (error) {
      console.error("login error:", error);
      setError(error.response?.data?.message || "login failed");
    }
  };

  return (
    <div className="w-2/3 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <h3 className="mb-4 border-b border-gray-200">Sign In</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <input
            id="username"
            className="border p-1"
            type="text"
            placeholder="Username"
            onChange={(e) => setusername(e.target.value)}
            autoComplete="username"
          />

          <input
            id="password"
            className="border p-1"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="p-1 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
