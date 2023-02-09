import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authintication/AuthProvider';

const Mycart = () => {
    const { user } = useContext(AuthContext)
    const { data: items = [], refetch, isLoading } = useQuery({
        queryKey: ['cartProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://filter-house-server.vercel.app/cartProducts/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('filterhouse-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const handleDelete = id => {
        const confirm = window.confirm('Do you want to remove this product from cart?')
        if (!confirm) {
            return
        }
        fetch(`https://filter-house-server.vercel.app/cartProduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    refetch()
                    return toast.success('Product Removed')
                }
            })
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Buy</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map(item => <tr key={item?._id}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.img} alt='' />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item?.name}</div>
                                        <p>Price: ${item?.price}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item?.email}
                            </td>
                            <td>
                                {item?.price && !item.paid && <Link to={`/dashboard/payment/${item?._id}`} className='btn btn-xs btn-primary'>Buy</Link>}
                                {item?.price && item.paid && <span className='text-sm text-green-500'>Paid</span>}
                            </td>
                            <th>
                                <button className="btn btn-error btn-xs" onClick={() => handleDelete(item._id)}>Remove</button>
                            </th>
                        </tr>)
                    }
                </tbody>


            </table>
        </div>
    );
};

export default Mycart;