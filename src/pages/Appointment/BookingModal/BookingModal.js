import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ service, selectedDate }) => {
    const { name, slots } = service
    const date = format(selectedDate, 'PP')
    return (
        <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle " />
            <div className="modal ">
                <div className="modal-box relative bg-white">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <div className="modal-action">
                        <form className=' mt-10'>
                            <input type="text" readOnly value={date} className="input input-bordered bg-white w-full m-2" />
                            <select className="select select-bordered w-full">
                                
                               {
                                slots.map(slot=><option value={slot}>{slot}</option>)
                               }
                            </select>
                            <input type="text" placeholder="Type here" className="input input-bordered bg-white w-full m-2" />
                            <input type="text" placeholder="Type here" className="input input-bordered bg-white w-full m-2" />
                            <br />
                            <input className='btn btn-accent w-full m-2' type="submit" value="Submit" />
                        </form>
                        <label htmlFor="my_modal_6" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 m-4 font-bold m-2">X</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingModal;