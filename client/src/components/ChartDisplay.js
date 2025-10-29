import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/ChartDisplay.css";

function ChartDisplay({ expenses = [], incomes = [], type = "expense" }) {
  const items = type === "income" ? incomes : expenses;
  if (!items.length) return <p>No data available</p>;

  const categoryTotals = {};
  items.forEach((item) => {
    const category = item.category || "Uncategorized";
    categoryTotals[category] = (categoryTotals[category] || 0) + Number(item.amount);
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));

  const COLORS = type === "income"
    ? ["#00C49F", "#82ca9d", "#0088FE", "#FFBB28", "#FF8042"]
    : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];


  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill={COLORS[0]}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartDisplay;
