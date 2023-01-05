import React from 'react';
import Lottie from "lottie-react";
import welcomingAnimation from './34554-technology.json'
const Dashboard = () => {
    return (
        <div>
            <Lottie animationData={welcomingAnimation} className='h-96' />
            <h1 className='text-center text-lg lg:text-3xl font-semibold mt-5'>Wellcome to Dashboard</h1>
        </div>
    );
};

export default Dashboard;