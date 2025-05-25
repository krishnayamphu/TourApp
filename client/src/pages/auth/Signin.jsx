import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        credentials
      ); // Your real login API
      const token = res.data.token;

      dispatch({ type: "LOGIN_SUCCESS", payload: token });

      const role = JSON.parse(atob(token.split(".")[1])).role;
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("JWT payload:", payload);
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid credentials" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Signin;
