import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import Navbar from "../components/Navbar";
import {CSVLink} from"react-csv";
import Budget from"../components/Budget";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CategorySummary from "../components/CategorySummary";
import Statistics from "../components/Statistics";


export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const[search, setSearch]=useState("");
  const[typeFilter, setTypeFilter] = useState("all");
  const[sortBy, setSortBy] = useState("newest");
  const [darkMode, setDarkMode]=useState(false);
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
  const loadTransactions = async () => {
    await fetchTransactions();
  };

  loadTransactions();
}, []);
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete transaction");
    }
  };
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;
  const filteredTransactions = transactions.filter((t) => {
  const matchesSearch =
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.note.toLowerCase().includes(search.toLowerCase());

  const matchesType =
    typeFilter === "all" || t.type === typeFilter;

  return matchesSearch && matchesType;
});
const sortedTransactions = [...filteredTransactions].sort((a, b) => {
  switch (sortBy) {
    case "oldest":
      return new Date(a.date) - new Date(b.date);

    case "highest":
      return b.amount - a.amount;

    case "lowest":
      return a.amount - b.amount;

    case "newest":
    default:
      return new Date(b.date) - new Date(a.date);
  }
});
const csvData = sortedTransactions.map((t) => ({
  Category: t.category,
  Type: t.type,
  Amount: t.amount,
  Note: t.note,
  Date: new Date(t.date).toLocaleDateString(),
}));
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Personal Finance Report", 14, 20);

  autoTable(doc, {
    head: [["Category", "Type", "Amount", "Note"]],
    body: sortedTransactions.map((t) => [
      t.category,
      t.type,
      `₹${t.amount}`,
      t.note,
    ]),
    startY: 30,
  });

  doc.save("Finance_Report.pdf");
};
const recentTransactions= sortedTransactions.slice(0,5);
return (
  <>
    <Navbar />
    <div
  className={`container mt-4 ${
    darkMode ? "bg-dark text-light p-4 rounded" : ""
  }`}
>

      <h2>💰 Personal Finance Dashboard</h2>

      <div className="mb-3">
        <Link to="/add" className="btn btn-primary">
          + Add Transaction
        </Link>
      </div>
      <button
  className="btn btn-secondary ms-2"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
      <CSVLink
  data={csvData}
  filename="transactions.csv"
  className="btn btn-success ms-2"
>
  Export CSV
</CSVLink>
<button 
className="btn btn-danger ms-2"
onClick={exportPDF}
>
  Export PDF
</button>
      <input
  type="text"
  className="form-control my-3"
  placeholder="🔍 Search by category or note..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<select
  className="form-select mb-3"
  value={typeFilter}
  onChange={(e) => setTypeFilter(e.target.value)}
>
  <option value="all">All</option>
  <option value="income">Income</option>
  <option value="expense">Expense</option>
</select>
<select
  className="form-select mb-3"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
  <option value="highest">Highest Amount</option>
  <option value="lowest">Lowest Amount</option>
</select>

<div className="row mt-4">
  {/* Balance, Income, Expense cards */}
</div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div
  className={`card p-3 shadow ${
    darkMode ? "bg-secondary text-white" : ""
  }`}
>
            <h5>Balance</h5>
            <h3>₹{balance}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5 className="text-success">Income</h5>
            <h3>₹{income}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5 className="text-danger">Expense</h5>
            <h3>₹{expense}</h3>
          </div>
        </div>
      </div>

      <ExpenseChart income={income} expense={expense} />
      <Budget expense={expense}/>
      <CategorySummary transactions={transactions}/>
      <Statistics transactions={transactions}/>

      <div className="mt-5">
        <h3>Recent Transactions</h3>

        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          recentTransactions.map((t) => (
            <div key={t._id} className="card mb-3 p-3 shadow-sm">
              <h5>{t.category}</h5>

              <p>
                <strong>Type:</strong> {t.type}
              </p>

              <p>
                <strong>Amount:</strong> ₹{t.amount}
              </p>

              <p>
                <strong>Note:</strong> {t.note}
              </p>

              <div className="d-flex gap-2">
                <Link
                  to={`/edit/${t._id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTransaction(t._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </>
);
}