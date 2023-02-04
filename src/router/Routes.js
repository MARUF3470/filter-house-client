import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import About from "../Pages/about/About";
import Login from "../Pages/authintication/login/Login";
import Registration from "../Pages/authintication/Registration/Registration";
import CategoryTypes from "../Pages/CategoryTypes/CategoryTypes";
import AddProducts from "../Pages/dashboard/addProducts/AddProducts";
import Allusers from "../Pages/dashboard/allUsers/Allusers";
import DashboardLayOut from "../Pages/dashboard/dashboadLayOut/DashboardLayOut";
import Dashboard from "../Pages/dashboard/dashboard/Dashboard";
import MyProducts from "../Pages/dashboard/myProducts/MyProducts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Mycart from "../Pages/myCart/Mycart";
import Payment from "../Pages/myCart/Payment";
import AdminPrivateRoute from "./AdminRoute";
import BuyerPrivateRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/contact',
                element: <About></About>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryTypes></CategoryTypes></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)

            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayOut></DashboardLayOut>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/addproducts',
                element: <AdminPrivateRoute><AddProducts></AddProducts></AdminPrivateRoute>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminPrivateRoute><Allusers></Allusers></AdminPrivateRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <AdminPrivateRoute><MyProducts></MyProducts></AdminPrivateRoute>
            },
            {
                path: '/dashboard/mycart',
                element: <BuyerPrivateRoute><Mycart></Mycart></BuyerPrivateRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/cartProduct/${params.id}`)
            }
        ]
    }
])

export default router