import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../shared/Header';
import { CgMenuGridO } from 'react-icons/cg';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../authintication/AuthProvider';
const DashboardLayOut = () => {
    const { user } = useContext(AuthContext)
    const { data: Suser = [], refetch, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <>
            <h1 className='text-3xl text-center lg:my-20'>To enter into dashboard, <Link className='link-primary' to='/login'>Login</Link> </h1>
        </>
    }
    return (
        <div>
            <Header></Header>
            <label htmlFor="dashboard-drawer" tabIndex={2} className="lg:hidden">
                <CgMenuGridO className='text-2xl' />
            </label>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side lg:bg-slate-300">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay w-1/2"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            Suser?.role && <><Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/addproducts'>Add Product</Link>
                                <Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/allusers'>All Users</Link>
                                <Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/myproducts'>My Products</Link></>
                        }
                        {
                            !Suser?.role && <Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/mycart'>My Cart</Link>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayOut;