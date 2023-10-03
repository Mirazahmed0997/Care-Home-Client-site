import React from 'react';
import Banner from '../Banner/Banner';
import Info from '../InfoCards/Info';
import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import Description from '../Description/Description';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Testmonials from '../Testmonials/Testmonials';
import Form from './Form/Form';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <Description></Description>
            <MakeAppointment></MakeAppointment>
            <Testmonials></Testmonials>
            <Form></Form>
        </div>
    );
};

export default Home;