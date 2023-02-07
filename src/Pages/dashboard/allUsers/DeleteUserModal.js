import React from 'react';
import { toast } from 'react-hot-toast';

const DeleteUserModal = ({ deleteUser, setDeleteUser, refetch }) => {
    const handleClose = event => {
        setDeleteUser(null)
    }
    const handleDeleteUser = id => {
        fetch(`http://localhost:5000/user/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('User Deleted')
                    refetch()
                    setDeleteUser(false)
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h5 className="text-xl">Do you want to delete <strong>{deleteUser.name}</strong></h5>
                    <label htmlFor="booking-modal" onClick={() => handleClose()} className="btn btn-sm btn-circle btn-outline absolute right-2 top-2">✕</label>
                    <button onClick={() => handleDeleteUser(deleteUser._id)} className='btn btn-primary btn-sm mt-5'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;