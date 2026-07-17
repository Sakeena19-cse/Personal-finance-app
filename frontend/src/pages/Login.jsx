import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}