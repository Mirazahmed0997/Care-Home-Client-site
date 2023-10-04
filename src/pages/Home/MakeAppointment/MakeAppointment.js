import React from 'react';
import doctor from '../../../assets/images/dr strange.png'
import appointment from '../../../assets/images/appointment.png'
import PromaryBtn from '../../../Components/PrimaryButton/PromaryBtn';


const MakeAppointment = () => {
    return (
        <section className='mt-20' style={{background:`url(${appointment})`}}>
                    <div className="hero text-white">
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} alt='' className="-mt-16 hidden lg:block lg:w-1/2 rounded-lg shadow-2xl " />
                <div>
                    <h4 className='text-lg text-primary font-semibold'>Appointment</h4>
                <h1 className="text-4xl font-bold">Make Your Appointment With Your Super Doctor!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <PromaryBtn>Get Appointed</PromaryBtn>
                </div>
            </div>
            </div> 
        </section>
    );
};

export default MakeAppointment;