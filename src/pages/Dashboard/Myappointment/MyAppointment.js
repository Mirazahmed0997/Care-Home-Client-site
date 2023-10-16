import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from 'react-query';

const MyAppointment = () => {

    const {user}=useContext(AuthContext)
    const url=`http://localhost:5000/bookings?email=${user?.email}`
    const {data:bookings=[]}= useQuery({
        queryKey:['bookings',user?.email],
        queryFn:async()=>{
            const res=await fetch(url,{
              headers:{
                authorization:`bearer ${localStorage.getItem('accessToken')}`
              }
            });
            const data=await res.json();
            return data;
        }
    })

    return (
        <div className=''>
            <h3 className='text-2xl p-2 mb-2'>My appointment</h3>
            <div className="overflow-x-auto ">
  <table className="table w-full">
    <thead>
      <tr className='text-black'>
        <th></th>
        <th>Name</th>
        <th>Treatment</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      
       {
        bookings.map((booking,i)=> <tr key={booking._id}>
        <th>{i+1}</th>
        <td>{booking.patient}</td>
        <td>{booking.treatment}</td>
        <td>{booking.appointmentDate}</td>
        <td>{booking.slots}</td>
      </tr>)
       }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;