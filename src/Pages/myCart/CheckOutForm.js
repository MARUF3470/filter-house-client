import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';

const CheckOutForm = ({ booking }) => {
    const { price, name, email, _id } = booking
    const stripe = useStripe();
    const elements = useElements();
    const [cartError, SetCartError] = useState('')
    const [cartSuccess, SetcartSuccess] = useState('')
    const [processing, SetProcessing] = useState(false)
    const [paymentId, SetPaymentId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);
    const handleSubmit = async (event) => {
        SetcartSuccess('')
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            SetCartError(error.message)
        } else {
            SetCartError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
        SetProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            SetCartError(confirmError.message)
            return
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card)
            const payment = {
                price,
                transectionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        SetcartSuccess('Congrats, Your payment successfully done')
                        SetPaymentId(paymentIntent.id)
                    }
                })
        }
        SetProcessing(false)
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='btn btn-primary btn-xs mt-4' disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
            <p className='text-error'>{cartError}</p>
            {
                cartSuccess && <>
                    <p className='font-semibold text-sm text-green-500 mt-5 '>{cartSuccess}</p>
                    <p className='font-semibold text-sm'>Your Transection ID: {paymentId}</p>
                </>
            }
        </form>
    );
};

export default CheckOutForm;