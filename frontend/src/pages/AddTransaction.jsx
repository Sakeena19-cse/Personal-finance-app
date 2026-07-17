import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddTransaction() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "expense",
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
        console.error(err);
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <select
          className="form-control mb-3"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          className="form-control mb-3"
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="text"
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Save Transaction
        </button>
      </form>
    </div>
  );
}