import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import {toast} from "react-toastify";

export default function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    note: "",
  });
  const fetchTransaction = async () => {
    try {
      const res = await API.get(`/transactions/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(() => {
  const loadTransactions = async () => {
    await fetchTransaction();
  };
  loadTransactions();
}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/transactions/${id}`, form);
      toast.success("Transaction Updated Successfully!");
      navigate("/dashboard");
    } catch {
      toast.error("Failed to update transaction");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Transaction</h2>

      <form onSubmit={handleSubmit}>
        <select
          className="form-control mb-3"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          className="form-control mb-3"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

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
          name="note"
          placeholder="Note"
          value={form.note}
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Update Transaction
        </button>
      </form>
    </div>
  );
}