import { createBrowserRouter, Navigate } from "react-router-dom";
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
import Drive from "../pages/Ride/Drive/Drive";
import Ride from "../pages/Ride/Ride/Ride";
import ProtectedRoute from "./ProtectedRoute";
import ReqLogin from "../pages/Shared/User/Login/ReqLogin";
import LiveSearchDriverComponent from "../pages/Ride/Ride/LiveSearchDriverComponent";
import RidingTime from "../pages/Ride/Ride/RidingTime";
import CompleteRide from "../pages/Ride/Ride/CompleteRide";
import ProfileLayout from "../pages/Shared/User/Profile/ProfileLayout/ProfileLayout";
import ProfileMain from "../pages/Shared/User/Profile/ProfileMain/ProfileMain";
import PasswordChange from "../pages/Shared/User/Profile/PasswordChange/PasswordChange";
import UpdateBioInfo from "../pages/Shared/User/Profile/UpdateBioInfo/UpdateBioInfo";
import UserNameChange from "../pages/Shared/User/Profile/UserNameChange/UserNameChange";
import RiderHistory from "../pages/Shared/User/Profile/RiderHistory/RiderHistory";  


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
        path: "/",
        element: <RideLayout></RideLayout>,
        children: [
          {
            path: "/driver-status",
            element: (
              <ProtectedRoute>
                <Drive />
              </ProtectedRoute>
            ),
          },
          {
            path: "/ride-with-ridewave",
            element: (
              <ProtectedRoute>
                <Ride />
              </ProtectedRoute>
            ),
          },
          {
            path: "/searching-for-driver",
            element: (
              <ProtectedRoute>
                <LiveSearchDriverComponent />
              </ProtectedRoute>
            ),
          },
          {
            path: "/ride-status",
            element: (
              <ProtectedRoute>
                <RidingTime />
              </ProtectedRoute>
            ),
          },
          {
            path: "/after_ride",
            element: (
              <ProtectedRoute>
                <CompleteRide />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/my-driver-dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
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
            path: "/user/driver-login",
            element: <ReqLogin></ReqLogin>,
          },
          {
            path: "/user/registration",
            element: <SignUp></SignUp>,
          },
          {
            path: "/user/profile",
            element: (
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            ),
            children:[
              {
                path: "/user/profile/",
                element: (
                  <ProtectedRoute>
                    <ProfileMain />
                  </ProtectedRoute>
                ), 
              },
              {
                path: "/user/profile/change-password",
                element: (
                  <ProtectedRoute>
                    <PasswordChange />
                  </ProtectedRoute>
                ), 
              },
              {
                path: "/user/profile/update-bio",
                element: (
                  <ProtectedRoute>
                    <UpdateBioInfo />
                  </ProtectedRoute>
                )
              },
              {
                path: "/user/profile/update-name",
                element: (
                  <ProtectedRoute>
                    {/* Add Update Name Component */}
                    <UserNameChange />
                  </ProtectedRoute>
                )
              },
              {
                path: "/user/profile/ride-history",
                element: (
                  <ProtectedRoute>
                    {/* Add Ride History Component */}
                    <RiderHistory />
                  </ProtectedRoute>
                )
              }
            ]
          },
        ],
      },
      {
        path: "*",
        element: <h1>No page available</h1>,
      },
    ],
  },
]);
