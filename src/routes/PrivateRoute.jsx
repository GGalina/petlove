// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);

  // If logged in, render children; otherwise redirect to login
  return token ? children : <Navigate to="/login" replace />;
}