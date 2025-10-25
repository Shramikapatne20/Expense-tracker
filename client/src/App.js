import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-expense" element={<AddExpensePage />} />
        <Route path="/income" element={<AddIncomePage />} />
        <Route path="/incomelist" element={<IncomeListPage />} />
        <Route path="/expenses" element={<ExpenseListPage />} />
        <Route path="/categories" element={<ExpensesByCategoryPage />} />
        <Route path="/totals" element={<TotalSummaryPage />} />
        <Route path="/incomecategory" element={<IncomeByCategoryPage />} />
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
