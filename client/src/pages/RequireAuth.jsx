import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userState } from '../features/auth/user';


export default function RequireAuth({ children }) {
  const authUser = useSelector(userState);
  const location = useLocation();

  return authUser !== null ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
