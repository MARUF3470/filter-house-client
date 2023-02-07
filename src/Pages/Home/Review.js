import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
const Review = ({ review, i, refetch }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const handleUpdate = event => {
        event.preventDefault()
        const review = event.target.newReview.value
        console.log(review)
        fetch(`http://localhost:5000/reviews/${review._id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: review })
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
        <tr key={review._id}>
            <th>{i + 1}</th>
            <td>{review?.review}</td>
            <td className='my-auto' >
                <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    type="button"
                    onClick={() => setShowUpdateModal(true)}
                >
                    Update
                </button>
                {showUpdateModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <form onSubmit={handleUpdate} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowUpdateModal(false)}
                                        >
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <textarea name='newReview' defaultValue={review.review} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowUpdateModal(false)}
                                        >
                                            Close
                                        </button>
                                        <input
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                            value='Save Change' onSubmit={handleUpdate} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </td>
            <td className='my-auto'><button onClick={() => handleDelete(review._id)} className='btn btn-xs btn-ghost pl-0'>Delete</button></td>
        </tr>
    );
};

export default Review;