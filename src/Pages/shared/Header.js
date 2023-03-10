import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { themeChange } from 'theme-change';
import logo from '../../components/images/filterpic/car-air-filters-icon-simple-260nw-713697937-removebg-preview.png'
import { RxAvatar } from 'react-icons/rx';
import { AuthContext } from '../authintication/AuthProvider';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
const Header = () => {
    useEffect(() => {
        themeChange(false)
    }, [])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user, logOut, updateUser } = useContext(AuthContext)
    const { data: Suser = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://filter-house-server.vercel.app/users/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('filterhouse-token')}`
                }
            })
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
    const handleUpdate = (data, event) => {
        const imgKey = process.env.REACT_APP_imgkey
        console.log(data)
        const image = data.picture[0]
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    const profile = {
                        displayName: data.name,
                        photoURL: imgdata.data.url
                    }
                    updateUser(profile)
                        .then(() => {
                            toast.custom((t) => (
                                <div
                                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                >
                                    <div className="flex-1 w-0 p-4">
                                        <div className="flex items-start">
                                            <p>Your Profile is updated, it may take some seceonds to updated the profile or reload the page</p>
                                        </div>
                                    </div>
                                    <div className="flex border-l border-gray-200">
                                        <button
                                            onClick={() => toast.dismiss(t.id)}
                                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ))
                        })
                        .catch(err => console.error(err))
                }
            })

    }
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
                    {user?.email ?
                        <div tabIndex={0} className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={user?.photoURL} alt='' />
                            </div>
                        </div> : <RxAvatar className='w-10 h-10'></RxAvatar>}
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-md w-52 mt-4">
                        <h3 className='mx-2 text-sm'>{user?.displayName}</h3>
                        <h3 className='mx-2 text-sm'>{Suser?.email}</h3>

                        {user?.email && <label htmlFor="my-modal" className="btn btn-xs mt-2 btn-outline btn-primary w-fit">Edit Profile</label>}
                        {user?.email && <button onClick={handleSingOut} className='btn btn-xs mt-2 btn-outline btn-primary w-fit'>Log out</button>}
                        <label className="swap w-fit swap-rotate ml-2 mt-1"  >
                            <input type="checkbox" />
                            <svg data-set-theme="lemonade" className="swap-on fill-current w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg data-set-theme="dark" className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                    </ul>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <form onSubmit={handleSubmit(handleUpdate)} className="modal-box">
                            <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                            <label className="label">
                                <span className="label-text">Name:</span>
                            </label>
                            <input  {...register('name', { required: 'Provide your new name' })} className="py-4 input input-bordered" defaultValue={user?.displayName} />
                            {errors.name && <p className='text-red-400 text-xs mt-1'>{errors.name.message}</p>}
                            <label className="label">
                                <span className="label-text">Image:</span>
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div className="flex flex-col items-center justify-center lg:pt-5 lg:pb-6 px-5">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" {...register('picture', { required: 'Picture is required' })} type="file" className="hidden lg:block" />
                                </label>
                            </div>
                            {errors.picture && <p className='text-red-400 text-xs mt-1'>{errors.picture.message}</p>}
                            <div className="modal-action">
                                <input type="submit" className='btn btn-primary' value="Update" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;




