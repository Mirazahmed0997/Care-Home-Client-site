import React from 'react';
import teethpic from '../../../assets/images/teethpic.png'
import PromaryBtn from '../../../Components/PrimaryButton/PromaryBtn';

const Description = () => {
    return (
        <div className="mt-16 card card-side bg-base-100 shadow-xl text-black flex-col lg:flex-row flex-row-reverse ">
        <figure><img className='w-1/2 m-6' src={teethpic} alt="Movie"/></figure>
        <div className="card-body  w-1/2">
          <h2 className="card-title">We care about your smile!</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, laboriosam illo! Autem eaque provident corrupti cupiditate tenetur dolores libero esse.</p>
          <div className="card-actions justify-start">
            <PromaryBtn>About us!</PromaryBtn>
          </div>
        </div>
      </div>
    );
};

export default Description;