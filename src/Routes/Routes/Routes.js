import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import SignUp from "../../pages/SignUp/SignUp";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../pages/Dashboard/Myappointment/MyAppointment";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../PrivateRoute/AdminRoute";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/appointment',
                element:<Appointment></Appointment>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:
        [
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/allUsers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
])