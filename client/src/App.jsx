import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';
import ResendOTP from './pages/ResendOTP';
import RequireAuth from './pages/RequireAuth';

export default function App() {
  return (
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Logins />} />
    <Route path="/account/:subpage?" element={<AccountPage />} />

    <Route path="/account/:subpage/:action" element={<AccountPage />} />
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/resend-otp" element={<ResendOTP />} />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
