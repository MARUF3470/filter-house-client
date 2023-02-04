import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';
const stripePromise = loadStripe(process.env.REACT_APP_pkstripe);
const Payment = () => {
    const booking = useLoaderData()
    console.log('payment', booking)
    return (
        <div className='m-5'>
            <h3 className='text-3xl'>Payment For {booking?.name}</h3>
            <p>Please pay ${booking?.price}</p>
            <div className='w-96 mt-5'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;