// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // Om användaren inte är inloggad, redirecta till login
    return <Navigate to="/login" replace />;
  }

  // Om användaren är inloggad, rendera barn-komponenten
  return children;
};

export default ProtectedRoute;
