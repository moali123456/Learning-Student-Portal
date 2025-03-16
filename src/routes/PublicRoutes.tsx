import { RouteObject } from "react-router-dom";
import PreLogin from "../pages/pre-login";
import Home from "../pages/home";
import Login from "../pages/login";
import PublicRoute from "./PublicRoute";

const publicRoutes: RouteObject[] = [
  { path: "/", element: <Home /> }, 
  { path: "/home", element: <Home /> }, 
  {
    path: "/",
    element: <PublicRoute />, // Protects only login and pre-login
    children: [
      { path: "login", element: <Login /> },
      { path: "pre-login", element: <PreLogin /> },
    ],
  },
];

export default publicRoutes;
