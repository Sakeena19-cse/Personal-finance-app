export default function Statistics({
  transactions,
  income,
  expense,
  balance,
}) {
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const incomes = transactions.filter(
    (t) => t.type === "income"
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((t) => t.amount))
      : 0;

  const highestIncome =
    incomes.length > 0
      ? Math.max(...incomes.map((t) => t.amount))
      : 0;

  const averageExpense =
    expenses.length > 0
      ? (
          expenses.reduce((sum, t) => sum + t.amount, 0) /
          expenses.length
        ).toFixed(2)
      : 0;

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Balance</h5>
              <h2>₹{balance}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Total Income</h5>
              <h2>₹{income}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h5>Total Expense</h5>
              <h2>₹{expense}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-3 shadow mt-4">
        <h4>Statistics</h4>

        <p><strong>Total Transactions:</strong> {transactions.length}</p>
        <p><strong>Highest Expense:</strong> ₹{highestExpense}</p>
        <p><strong>Highest Income:</strong> ₹{highestIncome}</p>
        <p><strong>Average Expense:</strong> ₹{averageExpense}</p>
      </div>
    </>
  );
}