import React from 'react';
import PromaryBtn from '../../../Components/PrimaryButton/PromaryBtn';

const Form = () => {
    return (
        <div className='text-center bg-neutral-300 w-full'>

            <div className='text-center p-6'>
                    <h3 className=' text-xl font-bold text-primary uppercase'>Contact Us</h3>
                    <h2 className='text-3xl text-black font-semibold'>Stay Connected With Us</h2>           
         </div>
        
         <div className='grid gap-6 text-center justify-center m-6 p-6'>
              <input type="text" placeholder="Email Address" className="input input-bordered w-full max-w-xs bg-white" />
              <input type="text" placeholder="Subject" className="input input-bordered w-full max-w-xs bg-white" />
              <textarea className="textarea textarea-bordered bg-white" placeholder="Your Message"></textarea>
               <PromaryBtn>Submit</PromaryBtn>
         </div>
        
        </div>
    );
};

export default Form;