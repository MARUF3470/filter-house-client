import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authintication/AuthProvider';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useQuery } from '@tanstack/react-query';
const Product = ({ product }) => {
    const [showProductDeleteModal, setShowProductDeleteModal] = React.useState(false);
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
    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                    setShowProductDeleteModal(false)
                    return toast.success('Product deleted successfully')
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
                        {
                            sUser?.role ?
                                <>
                                    {/* <label htmlFor="my-modal" className="btn btn-outline btn-xs">Delete</label>
                                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-semibold text-lg">Do you want to delete {product?.name}</h3>
                                            <div className="modal-action">
                                                <label htmlFor="my-modal" onClick={deleteProduct} className="btn btn-sm btn-outline">Delete</label>
                                                <label htmlFor="my-modal" className="btn btn-sm btn-outline">Cancel</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <button
                                        className="btn btn-xs btn-outline"
                                        type="button"
                                        onClick={() => setShowProductDeleteModal(true)}
                                    >
                                        Delete
                                    </button>
                                    {showProductDeleteModal ? (
                                        <>
                                            <div
                                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                            >
                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">

                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <button
                                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                onClick={() => setShowProductDeleteModal(false)}
                                                            >
                                                            </button>
                                                        </div>

                                                        <div className="relative p-6 flex-auto">
                                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                                                Do you really want to delete <strong>{product.name}</strong>
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                            <button
                                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={() => setShowProductDeleteModal(false)}
                                                            >
                                                                Close
                                                            </button>
                                                            <button
                                                                className="btn btn-xs btn-outline"
                                                                type="button"
                                                                onClick={() => deleteProduct(product?._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ) : null}
                                </> : <button onClick={handleCart} className="btn btn-primary btn-sm">Add to cart</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;