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
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ReviewModal from './ReviewModal';
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
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const req = await fetch('http://localhost:5000/reviews')
            const data = await req.json()
            return data
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleReview = (data, event) => {
        const reviewData = {
            img: user.photoURL,
            ...data,
            email: user?.email
        }
        event.preventDefault()
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Your review added')
                    event.target.reset()
                }
            })
    }
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
    return (
        <div>
            <div className="carousel w-11/12 mx-auto lg:h-[500px] my-2">
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
                <div className='w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-2'>
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
                <div className='grid grid-cols-1 lg:grid-cols-3 my-10 gap-2'>
                    <div className='col-span-1 lg:col-span-2'>
                        <h5 className='text-lg font-bold'>Reviews</h5>
                        {reviews.map(review =>
                            <figure class="border rounded-md p-3 shadow-lg mb-2" key={review._id}>
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
                                <blockquote>
                                    <p class="italic font-medium text-gray-900">Review: {review?.review}</p>
                                </blockquote>
                                <figcaption class="">
                                    <div class="flex items-center gap-1 dark:divide-gray-700">
                                        <img class="w-8 h-8 rounded-full" src={review?.img} alt='' />
                                        <cite class="pr-3 font-medium text-gray-900">{review?.name}</cite>
                                    </div>
                                </figcaption>
                            </figure>
                        )}
                    </div>
                    <div className='col-span-1'>
                        <h5 className='text-lg font-bold'>Add Your review</h5>
                        <form onSubmit={handleSubmit(handleReview)} className='border p-3 rounded-md shadow-2xl'>
                            <input type='text' {...register('name', { required: 'You need to login to give your review' })} className='input input-bordered w-full' defaultValue={Suser.name} readOnly />
                            {errors.name && <p className='text-red-500 mt-1 text-xs'>{errors.name.message}</p>}
                            <textarea {...register('review', { required: 'Give your review' })} className="textarea textarea-bordered w-full mt-2" placeholder="Type your review"></textarea>
                            {errors.review && <p className='text-red-500 mb-1 text-xs'> {errors.review.message}</p>}
                            <input type="submit" className='text-white bg-gradient-to-br w-1/2 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' value="Submit" />
                        </form>
                    </div>
                </div>
                <ReviewModal></ReviewModal>
            </div>
        </div>
    );
};

export default Home;