import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./PublicRoutes";
import studentRoutes from "./StudentRoutes";
import dashboardRoutes from "./DashboardRoutes";
import NotFound from "../pages/not-found";

export const routes = createBrowserRouter([
  ...publicRoutes,
  studentRoutes,
  dashboardRoutes,
  { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
]);
