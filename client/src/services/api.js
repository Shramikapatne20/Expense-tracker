const API_URL = "http://localhost:5000/api"; // adjust for production later

// 🔹 Register User
export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 Login User
export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 Get all expenses
export async function getExpenses(token) {
  const res = await fetch(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// 🔹 Add a new expense
export async function addExpense(token, data) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 Update an expense
export const updateExpense = async (token, id, data) => {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update expense");
  return await res.json();
};

// 🔹 Delete an expense
// Corrected deleteExpense
export async function deleteExpense(id, token) {
  const res = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete expense");

  return res.json();
}
// In services/api.js
export async function addIncome(token, data) {
  const res = await fetch(`${API_URL}/income`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add income");
  return res.json();
}



// 🔹 Get all Income
export async function getIncome(token) {
  const res = await fetch(`${API_URL}/income`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch income");
  return res.json();
}

// 🔹 Update Income
export async function updateIncome(token, id, data) {
  const res = await fetch(`${API_URL}/income/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update income");
  return res.json();
}

// 🔹 Delete Income
export async function deleteIncome(id, token) {
  const res = await fetch(`${API_URL}/income/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to delete income");
  return res.json();
}

