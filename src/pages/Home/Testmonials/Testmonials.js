import React from 'react';
import person1 from '../../../assets/images/person1.jpg'
import person2 from '../../../assets/images/person2.jpg'
import person3 from '../../../assets/images/person3.jpg'
import Testmonial from './Testmonial';



const Testmonials = () => {

    const testmonialsData=[
        {
            id:1,
            name:'Scarlet Johansen',
            message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis incidunt dolore alias ea doloremque expedita, dolorum facere saepe atque explicabo!',
            img:person1,
            location:'Scotland'
        },
        {
            id:2,
            name:'Miraz Ahmed',
            message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis incidunt dolore alias ea doloremque expedita, dolorum facere saepe atque explicabo!',
            img:person2,
            location:'Bangladesh'
        },
        {
            id:3,
            name:'Isty Partho',
            message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis incidunt dolore alias ea doloremque expedita, dolorum facere saepe atque explicabo!',
            img:person3,
            location:'Finland'
        }
    ]

    return (
        
        <div className='mt-16'>
              <div className='text-center'>
                    <h3 className=' text-xl font-bold text-primary uppercase'>Reviews</h3>
                    <h2 className='text-3xl text-black font-semibold'>What Our Patients Says?</h2>
                    
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 p-2 lg:grid-cols-3 gap-8 m-5 text-black'>
                {
                    testmonialsData.map(testmonial=><Testmonial key={testmonial.id} testmonial={testmonial}></Testmonial>)
                }
             </div>
        </div>
    );
};

export default Testmonials;