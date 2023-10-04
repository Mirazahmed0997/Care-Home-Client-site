import React from 'react';

const AppointmentTime = ({ avilableSlots,sertService }) => {
    const { name, slots } = avilableSlots
    return (
        <div className="card shadow-xl text-center">
            <div className="card-body ">
                <h2 className="text-2xl text-secondary font-bold">{name}</h2>
                <p>{
                    
                       slots.length>0 ? slots[0] : 'No Available Date'

                   }
                </p>
                <p>
                    {slots.length} {avilableSlots.length>1 ? 'slots' : 'slot'} Available
                </p>
                <div className="card-actions justify-center ">
                    <label disabled={avilableSlots.length==0} onClick={()=>sertService(avilableSlots)}  htmlFor="my_modal_6" className="btn btn-primary">Get Appointment</label>

                </div>
            </div>
        </div>
    );
};

export default AppointmentTime;