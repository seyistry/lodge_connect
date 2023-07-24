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
import Likes from './pages/Likes';
import PostApartment from './pages/PostApartment';
import VerifyResetOTP from './pages/VerifyResetOTP';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import PaymentPage from './pages/PaymentPage';
import EditPost from './pages/EditPost';

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/reset-verify" element={<VerifyResetOTP />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/resend-otp" element={<ResendOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/likes"
        element={
          <RequireAuth>
            <Likes />
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <AccountPage />
          </RequireAuth>
        }
      />
      <Route
        path="/add"
        element={
          <RequireAuth>
            <PostApartment />
          </RequireAuth>
        }
      />
      <Route
        path="/payment/:id"
        element={
          <RequireAuth>
            <PaymentPage />
          </RequireAuth>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <RequireAuth>
            <EditPost />
          </RequireAuth>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
