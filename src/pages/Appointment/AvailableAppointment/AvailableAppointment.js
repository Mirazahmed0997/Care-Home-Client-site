import { format } from 'date-fns';
import React, { useState } from 'react'; 
import AppointmentTime from './AppointmentTime';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointment = ({selectedDate,setSelectedDate}) => {
    const [service,sertService]=useState(null)
    const date = format(selectedDate,'PP')

    const {data:appointmentTime=[],refetch,isLoading}=useQuery({
        queryKey:['appointmentOptions',date],
        queryFn:async()=>
        {
            const res =await fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            const data= await res.json();
            return data
        }

    })

    if(isLoading)
    {
        return<Loading></Loading>
    }

    // useEffect(()=>
    // {
    //     fetch('http://localhost:5000/appointmentOptions')
    //     .then(res=>res.json())
    //     .then(data=>setAppointmentTime(data))
    // },[])

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
                refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;