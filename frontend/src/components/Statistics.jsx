export default function Statistics({ transactions }) {
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
    <div className="card p-3 shadow mt-4">
      <h4>Statistics</h4>

      <p>
        <strong>Total Transactions:</strong>{" "}
        {transactions.length}
      </p>

      <p>
        <strong>Highest Expense:</strong> ₹{highestExpense}
      </p>

      <p>
        <strong>Highest Income:</strong> ₹{highestIncome}
      </p>

      <p>
        <strong>Average Expense:</strong> ₹{averageExpense}
      </p>
    </div>
  );
}