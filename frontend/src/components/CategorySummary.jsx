export default function CategorySummary({ transactions }) {
  const summary = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      summary[t.category] =
        (summary[t.category] || 0) + t.amount;
    }
  });

  return (
    <div className="card p-3 shadow mt-4">
      <h4>Expense by Category</h4>

      {Object.keys(summary).length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        Object.entries(summary).map(([category, amount]) => (
          <div
            key={category}
            className="d-flex justify-content-between border-bottom py-2"
          >
            <strong>{category}</strong>
            <span>₹{amount}</span>
          </div>
        ))
      )}
    </div>
  );
}