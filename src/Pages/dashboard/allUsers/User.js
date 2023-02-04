import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const User = ({ suser, refetch }) => {
    const [deleteUser, setDeleteUser] = useState(false)
    if (deleteUser) {
        fetch(`http://localhost:5000/user/${suser?._id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User Deleted')
                    refetch()
                }
            })
    }
    const handleRole = () => {

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
            <td><button onClick={handleRole} className='btn btn-xs px-0 btn-ghost'>Make Admin</button></td>
            <th>
                <label htmlFor="my-modal" className="btn btn-circle btn-outline btn-xs">X</label>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg">Do you want to delete {suser?.name}</h3>
                        <div className="modal-action">
                            <label htmlFor="my-modal" onClick={() => setDeleteUser(true)} className="btn btn-sm btn-outline">Delete</label>
                            <label htmlFor="my-modal" className="btn btn-sm btn-outline">Cancel</label>
                        </div>
                    </div>
                </div>
            </th>
        </tr>
    );
};

export default User;