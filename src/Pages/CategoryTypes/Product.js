import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authintication/AuthProvider';

const Product = ({ product }) => {
    //console.log(product)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const handleCart = () => {
        // if (!user.email) {

        //     return navigate('/login')
        // }
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
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="p-3">
                    <img src={product.img} alt="Shoes" className="rounded-xl h-56 w-full" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <div className="card-actions">
                        <button onClick={handleCart} className="btn btn-primary btn-sm">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;