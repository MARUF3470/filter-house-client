import React from 'react';
import Lottie from "lottie-react";
import welcomingAnimation from './34554-technology.json'
const Dashboard = () => {
    return (
        <div>
            <Lottie animationData={welcomingAnimation} className='h-96' loop={true} />
            <h1 class="text-xl lg:text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome to dashboard
            </h1>
        </div>
    );
};

export default Dashboard;