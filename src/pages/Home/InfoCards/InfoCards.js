import React from 'react';
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
import Info from './Info';

const InfoCards = () => {

    const cardData=[
        {
            id:1,
            name:'Oprening Hours',
            Description:'Open 9.00 tp 5.00 Everyday',
            icon:clock,
            bgClass:'bg-gradient-to-r from-cyan-500 to-blue-500'
        },
        {
            id:2,
            name:'Our Locations',
            Description:'Lorem, ipsum dolor.',
            icon:marker,
            bgClass:'bg-neutral'
        },
        {
            id:3,
            name:'Contact',
            Description:'Lorem, ipsum dolor.',
            icon:phone,
            bgClass:'bg-gradient-to-r from-cyan-500 to-blue-500'
        }
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-2 lg:grid-cols-3 gap-6'>
            {
                cardData.map(card=><Info key={card.id} card={card}></Info>)
            }
            
        </div>
    );
};

export default InfoCards;