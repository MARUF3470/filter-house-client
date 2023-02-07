import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import DeleteUserModal from './DeleteUserModal';
import User from './User';

const Allusers = () => {
    const [deleteUser, setDeleteUser] = useState(null)
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
                    {Savedusers?.map(suser => <User key={suser._id} suser={suser} refetch={refetch} setDeleteUser={setDeleteUser}></User>)}
                </tbody>
            </table>
            {
                deleteUser && <DeleteUserModal deleteUser={deleteUser} refetch={refetch} setDeleteUser={setDeleteUser}></DeleteUserModal>
            }
        </div>
    );
};

export default Allusers;