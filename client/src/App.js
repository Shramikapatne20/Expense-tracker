import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ add this line
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpensePage from "./pages/AddExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import ExpensesByCategoryPage from "./pages/ExpensesByCategoryPage";
import AddIncomePage from "./pages/AddIncomePage";
import IncomeListPage from "./pages/IncomeListPage";
import IncomeByCategoryPage from "./pages/IncomeByCategory";
import TotalSummaryPage from "./pages/TotalSummaryPage";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <AddIncomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomelist"
          element={
            <ProtectedRoute>
              <IncomeListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpenseListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <ExpensesByCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/totals"
          element={
            <ProtectedRoute>
              <TotalSummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomecategory"
          element={
            <ProtectedRoute>
              <IncomeByCategoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
