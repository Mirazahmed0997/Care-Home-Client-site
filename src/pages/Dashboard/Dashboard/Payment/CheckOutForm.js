import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Loading from '../../../Shared/Loading/Loading';
import { json } from 'react-router-dom';

const CheckOutForm = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing,setProcessing]=useState(false)
    const [transactionID, setTransactionID] = useState('')

    const [clientSecret, setClientSecret] = useState('');
    // const [isLoading, setIsLoading] = useState(true)
    const { price, email, patient,_id } = booking




    useEffect(() => {
        // setIsLoading(true)
        fetch("https://care-home-server-site-qhfxnw12d-mirazahmed0997.vercel.app/create-payment-intent", {
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

        setSuccess('');
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            // console.log(card)
         const payment={
            price,
            transactionId:paymentIntent.id,
            email,
            bookingId:_id

         }
            fetch('https://care-home-server-site-qhfxnw12d-mirazahmed0997.vercel.app/payments',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                },
                body:JSON.stringify(payment)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.insertedId){
                    setSuccess('Congrats! Your payment is successfully done.')
                    setTransactionID(paymentIntent.id)
                }
            })
        }
        setProcessing(false);


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
                <button className='btn btn-sm btn-primary mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success &&
                <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transaction ID:<span className='font-bold'> {transactionID}</span></p>
                </div>
            }
        </>
    );
};

export default CheckOutForm;