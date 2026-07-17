import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
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
      const res = await API.post("/auth/register", form);
      alert(res.data.message || "Registration Successful!");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

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

        <button className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}