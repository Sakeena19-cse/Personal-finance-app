import { useState } from "react";

export default function Budget({ expense }) {
  const [budget, setBudget] = useState(10000);

  return (
    <div className="card p-3 shadow mt-4">
      <h4>Monthly Budget</h4>

      <input
        type="number"
        className="form-control my-3"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />

      <h5>Budget: ₹{budget}</h5>
      <h5>Spent: ₹{expense}</h5>
      <h5>Remaining: ₹{budget - expense}</h5>

      {expense > budget && (
        <div className="alert alert-danger mt-3">
          ⚠️ Budget Exceeded!
        </div>
      )}
    </div>
  );
}