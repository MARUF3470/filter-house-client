import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authintication/AuthProvider';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useQuery } from '@tanstack/react-query';
const Product = ({ product }) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { data: sUser = [], isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('filterhouse-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    const handleCart = () => {
        try {
            const cartProduct = {
                email: user.email,
                name: product.name,
                type: product.type,
                price: product.price,
                img: product.img
            }
            fetch('http://localhost:5000/cartProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartProduct),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Product added to your cart')
                    }
                })
                .catch(err => {
                    if (err) {
                        toast('You already add this product to your cart')
                    }
                })
        }
        catch {
            toast('You need to login first')
            navigate('/login')
        }
    }
    const deleteProduct = () => {
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast.promise('Product deleted successfully')
                    refetch()
                }
            })
    }
    return (
        <div>
            <div className="card w-full mx-auto bg-base-100 shadow-xl">
                <Zoom>
                    <figure className="p-3">
                        <img src={product.img} alt="Shoes" className="rounded-xl h-56 w-full" />
                    </figure>
                </Zoom>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <div className="card-actions">
                        {sUser?.role ? <> <label htmlFor="my-modal" className="btn btn-outline btn-xs">Delete</label>
                            <input type="checkbox" id="my-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-semibold text-lg">Do you want to delete {product?.name}</h3>
                                    <div className="modal-action">
                                        <label htmlFor="my-modal" onClick={deleteProduct} className="btn btn-sm btn-outline">Delete</label>
                                        <label htmlFor="my-modal" className="btn btn-sm btn-outline">Cancel</label>
                                    </div>
                                </div>
                            </div></> : <button onClick={handleCart} className="btn btn-primary btn-sm">Add to cart</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;