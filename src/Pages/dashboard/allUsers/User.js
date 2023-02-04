import React from 'react';

const User = ({ suser, refetch }) => {
    const handleRole = () => {

    }
    const handleDelete = () => {

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
                <button onClick={handleDelete} className="btn px-0 btn-ghost btn-xs text-red-600">Delete</button>
            </th>
        </tr>
    );
};

export default User;