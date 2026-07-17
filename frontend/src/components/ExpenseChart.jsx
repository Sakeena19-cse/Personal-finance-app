import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ExpenseChart({ income, expense }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "#4CAF50",
          "#F44336",
        ],
      },
    ],
  };

  return (
    <div className="mt-4">
      <h3>Income vs Expense</h3>
      <div style={{ width: "300px", margin: "auto" }}>
        <Pie data={data} />
      </div>
    </div>
  );
}