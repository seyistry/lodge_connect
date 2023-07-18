import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';
import ResendOTP from './pages/ResendOTP';
import RequireAuth from './pages/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/resend-otp" element={<ResendOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
