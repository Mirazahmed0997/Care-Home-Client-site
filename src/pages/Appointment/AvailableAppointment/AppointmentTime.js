import React from 'react';

const AppointmentTime = ({ availableSlot,sertService }) => {
    const { name, slots } = availableSlot
    return (
        <div className="card shadow-xl text-center">
            <div className="card-body ">
                <h2 className="text-2xl text-secondary font-bold">{name}</h2>
                <p>{
                    
                       slots.length>0 ? slots[0] : 'No Available Date'

                   }
                </p>
                <p>
                    {slots.length} {slots.length>1 ? 'slots' : 'slot'} Available
                </p>
                <div className="card-actions justify-center ">
                    <label onClick={()=>sertService(availableSlot)}  htmlFor="my_modal_6" className="btn btn-primary">Get Appointment</label>

                </div>
            </div>
        </div>
    );
};

export default AppointmentTime;