import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { login } = useContext(AuthContext)
    const handleLogin = (data, event) => {
        event.preventDefault()
        console.log(data)
        login(data.email, data.password)
            .then(res => {
                const user = res.user;
                if (user) {
                    navigate(from, { replace: true });
                    return toast.success('Login Successful')
                }
            })
            .catch(err => { console.log(err) })
    }
    return (
        <div>
            <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
                <div className="p-4 items-center justify-center w-11/12 lg:w-1/2 mx-auto rounded-xl space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl my-4">
                    <form onSubmit={handleSubmit(handleLogin)} className='w-3/4 mx-auto'>
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
                            <input type="password" {...register('password', { required: 'Your password is missing' })} placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password && <p className='text-red-600 mt-2'>{errors.password.message}</p>}
                        </div>
                        {errors.picture && <p className='text-red-600 mt-2'>{errors.picture.message}</p>}
                        <div className='flex justify-center'>
                            <input type="submit" className='text-white bg-gradient-to-br w-1/2 my-4 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' value="Login" />
                        </div>
                        <div className="divider">OR</div>
                        <div className='flex justify-center'>
                            <button type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                Sign in with Google
                            </button>
                        </div>
                        <p className='font-semibold text-sm'>New to this website? <Link to='/registration' className='link link-primary'>Registration</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;