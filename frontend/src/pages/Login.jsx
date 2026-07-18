import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import{Link} from"react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await API.post("/auth/login", form);

console.log("Login Response:", res.data);

localStorage.setItem("token", res.data.token);

console.log("Saved Token:", localStorage.getItem("token"));

alert("Login Successful!");
     

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{
      background: "linear-gradient(135deg, #667eea, #764ba2)",
    }}
  >
    <div
      className="card shadow-lg border-0"
      style={{
        width: "420px",
        borderRadius: "20px",
      }}
    >
      <div className="card-body p-5">
        <div className="text-center mb-4">
          <h1>💰</h1>
          <h2 className="fw-bold">Welcome Back</h2>
          <p className="text-muted">
            Sign in to manage your finances
          </p>
        </div>

        <form onSubmit={handleSubmit}>
  {/* Email */}
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input
      type="email"
      className="form-control"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Enter your email"
      required
    />
  </div>

  {/* Password */}
  <div className="mb-3">
    <label className="form-label">Password</label>

    <div className="input-group">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </div>

  <button type="submit" className="btn btn-primary w-100">
    Login
  </button>
</form>
        <div className="text-center mt-4">
          <small className="text-muted">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div>
  </div>
);
}