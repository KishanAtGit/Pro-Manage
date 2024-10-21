import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isSignedIn } = useAuth();

  return isSignedIn ? children : <Navigate to='/auth/login' />;
}
