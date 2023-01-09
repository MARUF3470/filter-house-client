import React from 'react';
import { toast } from 'react-hot-toast';

const Products = ({ product, refetch }) => {
    console.log(product)
    const handleDelete = id => {
        const confirmation = window.confirm(`Do you want to delete ${product?.name}`)
        fetch(`http://localhost:5000/products/${id}`, {
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
                <button onClick={() => handleDelete(product?._id)} className="btn btn-ghost btn-xs">Delete</button>
            </th>
            <th>
                <button className="btn btn-ghost btn-xs">Advertise</button>
            </th>
        </tr>
    );
};

export default Products;