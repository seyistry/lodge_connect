import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import LandingPage from './pages/LandingPage';
import { Outlet, Routes, Route } from 'react-router-dom';
import VerificationPage from './pages/VerificationPage';

const Layout = () => {
  return <Outlet />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="verify" element={<VerificationPage />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}
