import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PinPage from "./pages/PinPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import VerificationCodePage from "./pages/VerificationCodePage"
import NewPasswordPage from "./pages/NewPasswordPage"
import SuccessPage from "./pages/SuccessPage"
import DashboardPage from "./pages/DashboardPage"
import SalesPage from "./pages/SalesPage"
import ProductsPage from "./pages/ProductsPage"
import InventoryPage from "./pages/InventoryPage"
import CustomersPage from "./pages/CustomersPage"
import ReportsPage from "./pages/ReportsPage"
import SettingsPage from "./pages/SettingsPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/pin" element={<PinPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verification-code" element={<VerificationCodePage />} />
        <Route path="/new-password" element={<NewPasswordPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} /> 
      </Routes>
    </Router>
  )
}

export default App
