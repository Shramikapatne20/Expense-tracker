import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function TotalIncomeExpenseChart({ expenses = [], incomes = [] }) {
  // Calculate total income and total expenses
  const totals = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
    return [
      { name: "Income", amount: totalIncome },
      { name: "Expenses", amount: totalExpenses },
    ];
  }, [expenses, incomes]);

  // Income = Orange, Expenses = Green
  const COLORS = ["#FF8042", "#00C49F"];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={totals}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
          <Legend
            formatter={(value) => {
              if (value === "amount") return "Amount (₹)";
              return value;
            }}
          />
          <Bar dataKey="amount" name="Amount (₹)">
            {totals.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Custom color legend below chart */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: "#FF8042",
            marginRight: "8px",
            borderRadius: "3px",
          }}
        ></span>
        <span style={{ marginRight: "20px" }}>Income</span>

        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: "#00C49F",
            marginRight: "8px",
            borderRadius: "3px",
          }}
        ></span>
        <span>Expenses</span>
      </div>
    </div>
  );
}

export default TotalIncomeExpenseChart;
