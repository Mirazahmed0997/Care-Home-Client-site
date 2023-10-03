import React from 'react';
import img1 from '../../../assets/images/banner1.jpg'
import PromaryBtn from '../../../Components/PrimaryButton/PromaryBtn';

const Banner = () => {
    return (
        <div className="hero text-black m-6">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={img1} className="lg:w-1/3 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Consult Doctors From Home</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <PromaryBtn>Get Started</PromaryBtn>
          </div>
        </div>
      </div>
    );
};

export default Banner;