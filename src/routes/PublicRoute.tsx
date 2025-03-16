import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth, selectRole } from "../store/authSlice";

const PublicRoute = () => {
  const isAuthenticated = useSelector(selectAuth);
  const role = useSelector(selectRole);
  if (isAuthenticated) {
    // Redirect based on role
    return role === "admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/student" replace />
    );
  }

  return <Outlet />; // Allow access to public pages
};

export default PublicRoute;
