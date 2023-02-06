import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authintication/AuthProvider';

const ReviewModal = () => {
    const [showModal, setShowModal] = React.useState(false);
    const { user } = useContext(AuthContext)
    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/reviews/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('filterhouse-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleUpdate = (data) => {
        console.log(data)
        fetch(`http://localhost:5000/reviews/${data.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: data.review })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Your review updated')
                    refetch()
                }
            })
    }
    const handleDelete = id => {
        fetch(`http://localhost:5000/reviews/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.success('Your review is deleted')
                    refetch()
                }
            })
    }
    return (
        <div className=''>
            <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Manage Your Review
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-11/12 my-6 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {user?.displayName || <p><Link to='/login' className='link-primary'>Login</Link> for manage your review</p>}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <div className="overflow-x-auto">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Your Comment</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews?.map((review, i) => <tr key={review._id}>
                                                    <th>{i + 1}</th>
                                                    <td>{review?.review}</td>

                                                    <td className='my-auto' > <label htmlFor="my-modal2" className="btn btn-outline btn-xs">Update</label>
                                                        <input type="checkbox" id="my-modal2" className="modal-toggle" />
                                                        <form className="modal" onSubmit={handleSubmit(handleUpdate)}>
                                                            <div className="modal-box">
                                                                <textarea className="textarea textarea-bordered w-full" {...register('review')} defaultValue={review?.review}></textarea>
                                                                <input type="text" {...register('id')} defaultValue={review?._id} hidden readOnly />
                                                                <div className="modal-action">
                                                                    <input type='submit' htmlFor="my-modal2" className="btn btn-sm btn-outline" value='Update' />
                                                                    <label htmlFor="my-modal2" className="btn btn-sm btn-outline">Cancel</label>
                                                                </div>
                                                            </div>
                                                        </form></td>
                                                    <td className='my-auto'><button onClick={() => handleDelete(review._id)} className='btn btn-xs btn-ghost pl-0'>Delete</button></td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default ReviewModal;