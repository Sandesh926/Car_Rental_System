import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import LoginPage from "./pages/login/Login";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import LandingPage from "./pages/landing/Landing";
import RegisterPage from "./pages/register/Register";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";
import ProductsPage from "./pages/ProductsPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
      index: true,
    },
    {
      path: "login",
      element: <LoginPage />,
      index: true,
    },
    {
      path: "register",
      element: <RegisterPage />,
      index: true,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
