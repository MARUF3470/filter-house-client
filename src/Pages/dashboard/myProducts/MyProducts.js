import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Products from './Products';

const MyProducts = () => {
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products')
            const data = await res.json()
            return data
        }
    })
    return (
        <div className="overflow-x-auto w-full ">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Delete</th>
                        <th>Advertise</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <Products key={product._id} product={product} refetch={refetch}></Products>)}
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;