import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/shared/Footer';
import Header from '../Pages/shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;