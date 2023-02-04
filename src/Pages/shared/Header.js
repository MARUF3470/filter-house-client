import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { themeChange } from 'theme-change';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import logo from '../../components/images/filterpic/car-air-filters-icon-simple-260nw-713697937-removebg-preview.png'
import { AuthContext } from '../authintication/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
const Header = () => {
    useEffect(() => {
        themeChange(false)
    }, [])
    const { user, logOut } = useContext(AuthContext)
    const location = useLocation()
    const { data: Suser = [], } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    const handleSingOut = () => {
        logOut()
            .then(res => { toast.success('Logout successfull') })
            .catch(err => console.log(err))
    }
    const menu = <>
        <Link to='/' className='btn btn-ghost'>Home</Link>
        {user?.email && <Link to='/dashboard' className='btn btn-ghost'>DashBoard</Link>}

        {!user?.email && <> <Link to='/login' className='btn btn-ghost'>Login</Link><Link to='/registration' className='btn btn-ghost'>Registration</Link>
        </>}
        <Link to='/contact' className='btn btn-ghost'>Contuct us</Link>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl" to='/'>Filter House</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end cursor-pointer">
                    <div tabIndex={0} className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={user?.photoURL} alt='' />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-md w-52 mt-4">
                        <h3 className='text-center'>{Suser?.name}</h3>
                        <h3 className='text-center'>{Suser?.email}</h3>
                        <button className='btn btn-ghost btn-sm'>Edit Profile</button>
                        {user?.email && <button onClick={handleSingOut} className='btn btn-ghost btn-sm'>Log out</button>}
                        <label className="swap swap-rotate ml-2"  >
                            <input type="checkbox" />
                            <svg data-set-theme="lemonade" className="swap-on fill-current w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg data-set-theme="dark" className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;




