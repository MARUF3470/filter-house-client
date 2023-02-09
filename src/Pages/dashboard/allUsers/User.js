import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';


const User = ({ suser, refetch, setDeleteUser }) => {
    const handleRole = () => {
        fetch(`https://filter-house-server.vercel.app/user/${suser?._id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    toast.success('User updated to Admin')
                }
            })
    }
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={suser?.img} alt='' />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{suser?.name}</div>
                    <div className="text-sm opacity-50">{suser?.email}</div>
                </div>
            </td>
            <td>{suser?.role ? <span className='text-green-600 text-sm'>Admin</span> : <button onClick={handleRole} className='btn btn-xs px-0 btn-ghost'>Make Admin</button>}</td>
            <th>
                <label htmlFor="booking-modal" onClick={() => setDeleteUser(suser)} className="btn btn-circle btn-xs btn-outline">X</label>
            </th>
        </tr>
    );
};

export default User;