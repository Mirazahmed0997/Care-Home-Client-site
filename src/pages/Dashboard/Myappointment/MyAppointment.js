import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const MyAppointment = () => {

    const {user}=useContext(AuthContext)
    const url=`https://care-home-server-site-qhfxnw12d-mirazahmed0997.vercel.app/bookings?email=${user?.email}`
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
        <th>Fees</th>
        <th></th>

      </tr>
    </thead>
    <tbody>
      
       {
        bookings.map((booking,i)=> <tr key={booking._id}>
        <th>{i+1}</th>
        <td>{booking.patient}</td>
        <td>{booking.treatment}</td>
        <td>{booking.appointmentDate}</td>
        <td>{booking.price}</td>
        <td>
          {
            booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>pay now</button></Link>
          }
          {
            booking.price && booking.paid && <span className='btn btn-sm btn-primary'>Paid</span>
          }
        </td>

      </tr>)
       }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointment;