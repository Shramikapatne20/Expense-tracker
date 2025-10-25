import React, { useState, useMemo } from "react";
import "../styles/List.css";
import UpdateIncomeForm from "./UpdateIncomeForm";


function IncomeList({ income = [], onDelete, token, refresh }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [message, setMessage] = useState("");


  // 🔍 Filter incomes based on source, description, or date
const filteredIncome = useMemo(() => {
  return income.filter((inc) => {
    const source = inc.source ? inc.source.toLowerCase() : "";
    const description = inc.description ? inc.description.toLowerCase() : "";
    const date = inc.date || "";

    return (
      source.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      date.includes(searchTerm)
    );
  });
}, [income, searchTerm]);


  // 💰 Calculate daily, monthly, yearly totals
  const totals = useMemo(() => {
    const daily = {};
    const monthly = {};
    const yearly = {};

    income.forEach((inc) => {
      const date = new Date(inc.date);
      if (isNaN(date)) return;

      const dayKey = date.toISOString().split("T")[0];
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const yearKey = `${date.getFullYear()}`;

      daily[dayKey] = (daily[dayKey] || 0) + Number(inc.amount);
      monthly[monthKey] = (monthly[monthKey] || 0) + Number(inc.amount);
      yearly[yearKey] = (yearly[yearKey] || 0) + Number(inc.amount);
    });

    const today = new Date().toISOString().split("T")[0];
    const thisMonth = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
    const thisYear = `${new Date().getFullYear()}`;

    return {
      today: daily[today] || 0,
      month: monthly[thisMonth] || 0,
      year: yearly[thisYear] || 0,
    };
  }, [income]);

  // 🗑️ Delete handler
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await onDelete(id);
        setMessage("Income deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Failed to delete income. Try again.");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  // No income case
  if (!income.length) {
    return <p className="no-expense-text">No income records found.</p>;
  }

  return (
    <div className="expense-list-container">
      {message && <p className="form-message">{message}</p>}

      <div className="expense-header">
        <input
          type="text"
          placeholder="Search by source, description, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="totals-container">
          <div className="total-box">
            <h4>Today</h4>
            <p>₹{totals.today.toFixed(2)}</p>
          </div>
          <div className="total-box">
            <h4>This Month</h4>
            <p>₹{totals.month.toFixed(2)}</p>
          </div>
          <div className="total-box">
            <h4>This Year</h4>
            <p>₹{totals.year.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="expense-list">
        {filteredIncome.map((inc) => (
          <div className="expense-item" key={inc._id}>
            <h3>{inc.source}</h3>
            <p>
              <strong>Amount:</strong> ₹{inc.amount}
            </p>
            <p>
              <strong>Date:</strong> {inc.date}
            </p>
            {inc.description && (
              <p className="description">{inc.description}</p>
            )}

            <div className="expense-actions">
              <button
                className="update-btn"
                onClick={() => setSelectedIncome(inc)}
              >
                ✏️ Update
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(inc._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedIncome && (
        <UpdateIncomeForm
          token={token}
          income={selectedIncome}
          refresh={refresh}
          onClose={() => setSelectedIncome(null)}
        />
      )}
    </div>
  );
}

export default IncomeList;
