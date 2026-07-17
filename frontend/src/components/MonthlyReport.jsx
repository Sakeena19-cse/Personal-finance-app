import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyReport({ transactions }) {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    if (t.type === "expense") {
      monthlyData[month] += t.amount;
    }
  });

  const data = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyData),
      },
    ],
  };

  return <Bar data={data} />;
}