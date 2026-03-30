import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adams_token");

  // If no token exists, send them to the home page (or login page)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, let them see the admin page
  return children;
};

export default ProtectedRoute;
