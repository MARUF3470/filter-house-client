import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../../shared/Header';
import { CgMenuGridO } from 'react-icons/cg';
const DashboardLayOut = () => {
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
                        <Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/addproducts'>Add Product</Link>
                        <Link className=' btn btn-ghost justify-start w-1/2' to='/dashboard/allusers'>All Users</Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayOut;