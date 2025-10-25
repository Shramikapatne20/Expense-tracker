import React, { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/login_signup.css";

function Login() {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = await loginUser(form);
  if (data.token) {
    setToken(data.token);
    navigate("/home");
    setUser(data.user);
    navigate("/home"); // Redirect to home page after login
  } else {
    setError(data.message || "❌ Login failed. Check your credentials.");
  }
};


  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
       <p className="redirect-text">
        Don’t have an account?{" "}
        <Link to="/signup" className="redirect-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
