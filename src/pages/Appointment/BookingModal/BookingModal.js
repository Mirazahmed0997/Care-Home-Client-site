import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ service, selectedDate,sertService,refetch }) => {
    const {user}=useContext(AuthContext)
    const { name, slots } = service
    const date = format(selectedDate, 'PP')

    const handleBooking=event=>
    {
        event.preventDefault()
        const form=event.target;
        const slots=form.slots.value
        const patientName=form.name.value;
        const contact= form.contact.value
        const email=form.email.value
        const booking={
            appointmentDate:date,
            treatment:name,
            patient: patientName,
            slots,
            email,
            contact,

        }
        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>
            {
                console.log(data)
                if(data.acknowledged)
                {
                    sertService(null)
                    toast('Booking Confirmed')
                    refetch();
                }

            })



    }

    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle " />
            <div className="modal ">
                <div className="modal-box relative bg-white">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <div className="modal-action">
                        <form  onSubmit={handleBooking} className=' mt-10'>
                            <input type="text" readOnly value={date} className="input input-bordered bg-white w-full m-2" ></input>
                            <select name='slots' className="select select-bordered w-full">                  
                               {
                                slots.map((slot,i)=><option  value={slot} key={i}> {slot}</option>)
                               }
                            </select>
                            <input type="text"readOnly name='name'value={user?.displayName} placeholder="name" className="input input-bordered bg-white w-full m-2 "required ></input>
                            <input type="number"name='contact' placeholder="contact" className="input input-bordered bg-white w-full m-2"required ></input>
                            <input type="email"readOnly name='email' value={user?.email} placeholder="Email" className="input input-bordered bg-white w-full m-2" ></input>
                            <br />
                            <input className='btn btn-accent w-full m-2' type="submit" value="Submit" ></input>
                        </form>
                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 m-4 font-bold m-2">X</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;