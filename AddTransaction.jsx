import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
export default function AddTransaction() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    note: "",
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
      await API.post("/transactions/add", form);
      alert("Transaction Added!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to add transaction");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="type"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          className="form-control mb-3"
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="text"
          name="note"
          placeholder="Note"
          onChange={handleChange}
        />
        <button className="btn btn-primary">
          Add Transaction
        </button>

      </form>
    </div>
  );
}