import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Pages/authintication/AuthProvider';

const AdminPrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const { data: sUser = [], isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <h1 className='text-center'>Loading...</h1>
    }
    console.log('from ', sUser)

    if (sUser.role === true) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminPrivateRoute;