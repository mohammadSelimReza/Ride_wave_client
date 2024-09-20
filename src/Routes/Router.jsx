import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import RideLayout from "../pages/Ride/RideLayout/RideLayout";
import DashboardLayout from "../pages/Dashboard/DashboardLayout/DashboardLayout";
// import Login from "../pages/Shared/User/Login/Login";
import UserLayout from "../pages/Shared/User/UserLayout/UserLayout";
import Login from "../pages/Shared/User/Login/Login";
import SignUp from "../pages/Shared/User/SignUp/SignUp";
import About from "../pages/About/About";
import Services from "../pages/Services/Services";
import Pakages from "../pages/Pakages/Pakages";
import Contact from "../pages/Contact/Contact";
import MainLayout from "../Layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
          {
            path: "/about",
            element: <About></About>,
          },
          {
            path: "/services",
            element: <Services></Services>,
          },
          {
            path: "/pakages",
            element: <Pakages></Pakages>,
          },
          {
            path: "/contact",
            element: <Contact></Contact>,
          },
        ],
      },
      {
        path: "/ride-with-ridewave",
        element: <RideLayout></RideLayout>,
      },
      {
        path: "/my-driver-dashboard",
        element: <DashboardLayout></DashboardLayout>,
      },
      {
        path: "/user",
        element: <UserLayout></UserLayout>,
        children: [
          {
            path: "/user/login",
            element: <Login></Login>,
          },
          {
            path: "/user/registration",
            element: <SignUp></SignUp>,
          },
        ],
      },
      {
        path: "*",
        element: <h1>No page available</h1>
      }
    ],
  },
]);
