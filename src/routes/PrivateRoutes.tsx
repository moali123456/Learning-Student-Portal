import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth, selectRole } from "../store/authSlice";
import NotFound from "../pages/not-found";
interface PrivateRouteProps {
  allowedRoles: string[];
}
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const isAuthenticated = useSelector(selectAuth);
  const role = useSelector(selectRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role as string)) {
    return <NotFound />;
    // return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
