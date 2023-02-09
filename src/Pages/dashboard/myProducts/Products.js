import React from 'react';
import { toast } from 'react-hot-toast';
import { json } from 'react-router-dom';

const Products = ({ product, refetch }) => {
    const handleDelete = id => {
        const confirmation = window.confirm(`Do you want to delete ${product?.name}`)
        if (confirmation) {
            fetch(`https://filter-house-server.vercel.app/products/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Product deteled')
                        refetch()
                    }
                })
        }
    }
    const handleAdvertise = (value) => {
        fetch(`https://filter-house-server.vercel.app/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ advertise: value })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Advertisement Updated')
                    refetch()
                }
            })

    }
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={product?.img} alt='' />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold"></div>
                        <div className="text-sm opacity-50"></div>
                    </div>
                </div>
            </td>
            <td>
                {product?.name}
                <br />
                <span className="badge badge-ghost badge-sm">{product?.type}</span>
            </td>
            <td>${product.price}</td>
            <th>
                <button onClick={() => handleDelete(product?._id)} className="btn btn-ghost btn-xs px-0">Delete</button>
            </th>
            <th>
                {product?.advertise ? <button onClick={() => handleAdvertise(false)} className="btn btn-ghost btn-xs px-0">Remove Advertise</button> : <button onClick={() => handleAdvertise(true)} className="btn btn-ghost btn-xs">Advertise</button>}
            </th>
        </tr>
    );
};

export default Products;