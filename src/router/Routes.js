import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddProducts from "../Pages/dashboard/addProducts/AddProducts";
import DashboardLayOut from "../Pages/dashboard/dashboadLayOut/DashboardLayOut";
import Dashboard from "../Pages/dashboard/dashboard/Dashboard";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayOut></DashboardLayOut>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/addproducts',
                element: <AddProducts></AddProducts>
            }
        ]
    }
])

export default router