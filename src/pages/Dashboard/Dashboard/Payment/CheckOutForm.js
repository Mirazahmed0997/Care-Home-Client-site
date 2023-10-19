import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';

const CheckOutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    // const [isLoading, setIsLoading] = useState(true)
    const { price,email,patient } = booking




    useEffect(() => {
        // setIsLoading(true)
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                // setIsLoading(false)
            });
    }, [price]);

    //   if(isLoading)
    //   {
    //       <Loading></Loading>
    //   }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error)
            setCardError(error.message)
        }
        else {
            setCardError('');
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email:email
                    },
                },
            },
        );

    }

    return (
        <>

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
                <button className='btn btn-sm btn-primary mt-4' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>

        </>
    );
};

export default CheckOutForm;