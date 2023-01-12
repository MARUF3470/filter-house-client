import React, { useContext } from 'react';
import pic1 from '../../components/images/filterpic/sp6.jpg'
import pic2 from '../../components/images/filterpic/fp6.jpg'
import pic3 from '../../components/images/filterpic/nf2.jpg'
import pic4 from '../../components/images/filterpic/filterpicture1.png'
import pic5 from '../../components/images/filterpic/nf3.jpg'
import pic6 from '../../components/images/filterpic/fp5.jpg'
import pic7 from '../../components/images/filterpic/fp4.png'
import Banner from './Banner';
import Categories from '../category/Categories';
import { useQuery } from '@tanstack/react-query';
import Product from '../CategoryTypes/Product';
import { AuthContext } from '../authintication/AuthProvider';
const Home = () => {
    const { user } = useContext(AuthContext)
    const bannarData = [
        {
            image: pic1,
            prev: 6,
            id: 1,
            next: 2
        },
        {
            image: pic2,
            prev: 1,
            id: 2,
            next: 3
        },
        {
            image: pic3,
            prev: 2,
            id: 3,
            next: 4
        },
        {
            image: pic4,
            prev: 3,
            id: 4,
            next: 5
        },
        {
            image: pic5,
            prev: 4,
            id: 5,
            next: 6
        },
        {
            image: pic6,
            prev: 5,
            id: 6,
            next: 1
        }
    ]
    const { data: products = [], refetch, error, isLoadingError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const req = await fetch('http://localhost:5000/products')
            const data = await req.json()
            return data
        }
    })

    const { data: Suser = [], } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/${user?.email}`)
            const data = await res.json()
            return data
        }
    })
    if (isLoadingError) {
        return <progress className="progress w-56 text-center"></progress>
    }
    const advertiseProducts = products.filter(product => product.advertise)
    console.log(advertiseProducts)
    return (
        <div>
            <div className="carousel w-11/12 mx-auto h-3/4 my-2">
                {
                    bannarData.map(slide => <Banner key={slide.id} slide={slide}></Banner>)
                }
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-3/4 mx-auto items-center my-8'>
                <div className='col-span-1'>
                    <img src={pic7} alt="" />
                </div>
                <div className='col-span-1'>
                    <h4 className='text-blue-600 font3semibold'>About us</h4>
                    <p className='text-4xl font-semibold'>We are qualified and experienced in this field</p>
                    <p>We are succecfully running this business more then 20 years. we are one of the most experience company of Bangladesh in this field. We sell filters in many well known company of our country. We supply filter all over country.</p>
                </div>
            </div>
            <Categories></Categories>
            <div className='my-10'>
                <h3 className='text-center text-3xl font-semibold'>Top Products</h3>
                <div className='w-11/12 mx-auto grid grid-cols-3'>
                    {
                        advertiseProducts.length === 0 && <h1 className='text-center font-bold mt-8'>No Product to show</h1>
                    }
                    {
                        advertiseProducts.map(product => <Product key={product._id} product={product}></Product>)
                    }
                </div>
            </div>
            <div className='w-11/12 mx-auto my-10'>
                <h3 className='text-center text-3xl font-semibold'>Public Reviews</h3>
                <div className='grid grid-cols-3 my-10'>
                    <div className='col-span-1 lg:col-span-2'>
                        <h5 className='text-lg font-bold'>Reviews</h5>
                    </div>
                    <div className='col-span-1'>
                        <h5 className='text-lg font-bold'>Add Your review</h5>
                        <form className='border p-3 rounded-md shadow-2xl'>
                            <input type='text' className='input input-bordered w-full' defaultValue={Suser.name} readOnly />
                            <textarea className="textarea textarea-bordered w-full my-2" placeholder="Type your review"></textarea>
                            <input type="submit" className='text-white bg-gradient-to-br w-1/2 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;