import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);



const Payment = () => {
    const booking = useLoaderData();
    const { appointmentDate, treatment, price, slots } = booking
    return (
        <div className='p-7'>
            <h3 className='text-3xl text-primary'>Payment for {treatment}</h3>
            <h4>Appointment Slot : {appointmentDate} at {slots}</h4>
            <h4>Visit Fees: <span className='font-bold'>{price}</span> BDT</h4>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm 

                            booking={booking}

                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
