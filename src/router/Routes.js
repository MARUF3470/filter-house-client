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
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
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
                element: <CategoryTypes></CategoryTypes>,
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
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/addproducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/allusers',
                element: <Allusers></Allusers>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            }
        ]
    }
])

export default router