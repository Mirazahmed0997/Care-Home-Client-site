import React from 'react';
import PromaryBtn from '../../../../Components/PrimaryButton/PromaryBtn';
import backround from '../../../../assets/images/bg.png'

const Form = () => {
    return (
        <div
        //  style={{background:`url(${backround})`}}
         className='text-center bg-neutral-300 w-full p-6'>

            <div className='text-center p-6'>
                    <h3 className=' text-xl font-bold text-primary uppercase'>Contact Us</h3>
                    <h2 className='text-3xl text-black font-semibold'>Stay Connected With Us</h2>           
         </div>
        
         <div className='grid gap-6 text-center justify-center m-6'>
              <input type="text" placeholder="Email Address" className="input input-bordered w-full max-w-xs bg-white" />
              <input type="text" placeholder="Subject" className="input input-bordered w-full max-w-xs bg-white" />
              <textarea className="textarea textarea-bordered bg-white" placeholder="Your Message"></textarea>
              
         </div>
         <PromaryBtn>Submit</PromaryBtn>
        </div>
    );
};

export default Form;