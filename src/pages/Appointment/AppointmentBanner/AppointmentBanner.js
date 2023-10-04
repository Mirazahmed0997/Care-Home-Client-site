import React, { useState } from 'react';
import appointPic from '../../../assets/images/Book_online_appointment.png'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';


const AppointmentBanner = ({selectedDate,setSelectedDate}) => {
    return (
        <header>
            <div className="hero">
                <div className="hero-content flex flex-col lg:flex-row-reverse gap-6">
                    <img src={appointPic} className="lg:w-1/2 max-w-sm rounded-lg shadow-2xl" />
                
                <div className='w-1/2 m-20'>
                        <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        ></DayPicker>
                </div>
                </div>
                
            </div>
        </header>
    );
};

export default AppointmentBanner;