import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!token || !user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}
