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
import StaffPage from "./pages/StaffPage";
import AdminPage from "./pages/AdminPage";
import TrackCustomer from "./pages/TrackCustomer";
import CarInventory from "./pages/CarInventory";
import RentedCars from "./pages/RentedCars";
import SalesPage from "./pages/SalesPage";
import CarDamage from "./pages/CarDamage";
import ReturnCar from "./pages/ReturnCar";
import CustomerDetails from "./pages/CustomerDetails";
import ChangePassword from "./pages/ChangePassword";
import AddDocument from "./pages/AddDocuments";
import DamageRequest from "./pages/DamageRequest"
import RentCars from "./pages/RentCars"
import ManageRents from "./pages/ManageRents";
import MyRents from "./pages/MyRents";

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
        { path: 'staff', element: <StaffPage /> },
        { path: 'admin', element: <AdminPage /> },
        { path: 'car', element: <CarInventory /> },
        { path: 'rentedcars', element: <RentedCars /> },
        { path: 'sales', element: <SalesPage /> },
        { path: 'trackcustomer', element: <TrackCustomer /> },
        { path: 'cardamage', element: <CarDamage /> },
        { path: 'returncars', element: <ReturnCar /> },
        { path: 'customerdetails', element: <CustomerDetails /> },
        { path: '/dashboard/changepassword', element: <ChangePassword /> },
        { path: '/dashboard/adddocument', element: <AddDocument /> },
        { path: 'managedamage', element: <DamageRequest /> },
        { path: 'rentcars', element: <RentCars /> },
        { path: 'managerents', element: <ManageRents /> },
        { path: 'myrents', element: <MyRents /> },
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
