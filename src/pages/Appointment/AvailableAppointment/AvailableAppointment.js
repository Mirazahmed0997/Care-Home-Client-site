import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'; 
import AppointmentTime from './AppointmentTime';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointment = ({selectedDate,setSelectedDate}) => {
    const [appointmentTime,setAppointmentTime]=useState([])
    const [service,sertService]=useState(null)

    useEffect(()=>
    {
        fetch('services.json')
        .then(res=>res.json())
        .then(data=>setAppointmentTime(data))
    },[])

    return (
        <section className='mt-16'>
            <p className='text-center text-secondary font-bold' >Available Appointments on {format(selectedDate,'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-6'>
                {
                    appointmentTime.map(avilableSlots=><AppointmentTime key={avilableSlots._id} avilableSlots={avilableSlots} sertService={sertService}></AppointmentTime>)
                }
            </div>
            {
                service &&
                <BookingModal
                key={service._id} 
                service={service}
                selectedDate={selectedDate}
                sertService={sertService}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;