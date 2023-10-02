import React from 'react';

const Testmonial = ({testmonial}) => {
    const {name,message,img,location}=testmonial
    return (
        <div className="card w-96 text-black shadow-xl">
        <div className="card-body items-center text-center">
          <p className='p-3'>{message}</p>
          <div className="card-actions justify-between">
          <div className="avatar online">
            <div className="w-20 rounded-full">
                <img src={img} />
            </div>
            </div>
            <div className='flex flex-col text-start p-3'>
            <p className="font-bold">{name}</p> 
            <small className='font-semibold'>{location}</small>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Testmonial;