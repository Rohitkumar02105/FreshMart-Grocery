import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, form);
      localStorage.setItem("freshmartUser", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />
        {message && <p className="form-message">{message}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
