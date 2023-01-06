import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleRegistration = (data, event) => {
        event.preventDefault()
        console.log(data)
    }
    return (
        <div>
            <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
                <div className="p-4 items-center justify-center w-11/12 lg:w-1/2 mx-auto rounded-xl space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl my-4">
                    <form onSubmit={handleSubmit(handleRegistration)} className='w-3/4 mx-auto'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" {...register('name', { required: 'Your name is missing' })} placeholder="Enter your name" className="input input-bordered w-full" />
                            {errors.name && <p className='text-red-600 mt-2'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input type="email" {...register('email', { required: 'Your email is missing' })} placeholder="Enter your email" className="input input-bordered w-full" />
                            {errors.email && <p className='text-red-600 mt-2'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" {...register('password', { required: 'Your password is missing' })} placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password && <p className='text-red-600 mt-2'>{errors.password.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="text" {...register('cpassword', { required: 'Retype your password' })} placeholder="Retype your password" className="input input-bordered w-full" />
                            {errors.cpassword && <p className='text-red-600 mt-2'>{errors.cpassword.message}</p>}
                        </div>
                        <label className="label">
                            <span className="label-text">Upload Your picture</span>
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
                        {errors.picture && <p className='text-red-600 mt-2'>{errors.picture.message}</p>}
                        <div className='flex justify-center'>
                            <input type="submit" className='text-white bg-gradient-to-br w-1/2 my-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' value="Register" />
                        </div>
                        <p className='font-semibold text-sm'>Do you already have an account? <Link to='/login' className='link link-primary'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;