import { useQuery } from '@tanstack/react-query';
import React from 'react';
import User from './User';

const Allusers = () => {
    const { data: Savedusers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('filterhouse-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Savedusers?.map(suser => <User key={suser._id} suser={suser} refetch={refetch}></User>)}
                </tbody>
            </table>
        </div>
    );
};

export default Allusers;