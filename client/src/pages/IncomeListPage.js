import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getIncome, deleteIncome } from "../services/api"; // ✅ import income APIs
import IncomeList from "../components/IncomeList"; // ✅ import IncomeList component

function IncomeListPage() {
  const { token } = useContext(AuthContext);
  const [income, setIncome] = useState([]);

  // Fetch all income records
  const fetchIncome = async () => {
    try {
      const data = await getIncome(token);
      setIncome(data || []);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Delete income by ID
  const handleDelete = async (id) => {
    try {
      await deleteIncome(id, token);
      setIncome((prev) => prev.filter((inc) => inc._id !== id)); // remove deleted income
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="page-container">
      <h1>All Income Records</h1>
      <IncomeList
        income={income}
        onDelete={handleDelete}
        token={token}
        refresh={fetchIncome} // refresh after update
      />
    </div>
  );
}

export default IncomeListPage;
