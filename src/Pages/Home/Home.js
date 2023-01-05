import React from 'react';
import pic1 from '../../components/images/filterpic/sp6.jpg'
import pic2 from '../../components/images/filterpic/fp6.jpg'
import pic3 from '../../components/images/filterpic/nf2.jpg'
import pic4 from '../../components/images/filterpic/filterpicture1.png'
import pic5 from '../../components/images/filterpic/nf3.jpg'
import pic6 from '../../components/images/filterpic/fp5.jpg'
import pic7 from '../../components/images/filterpic/fp4.png'
import Banner from './Banner';
import Categories from '../category/Categories';
const Home = () => {
    const bannarData = [
        {
            image: pic1,
            prev: 6,
            id: 1,
            next: 2
        },
        {
            image: pic2,
            prev: 1,
            id: 2,
            next: 3
        },
        {
            image: pic3,
            prev: 2,
            id: 3,
            next: 4
        },
        {
            image: pic4,
            prev: 3,
            id: 4,
            next: 5
        },
        {
            image: pic5,
            prev: 4,
            id: 5,
            next: 6
        },
        {
            image: pic6,
            prev: 5,
            id: 6,
            next: 1
        }
    ]

    return (
        <div>
            <div className="carousel w-11/12 mx-auto h-3/4 my-2">
                {
                    bannarData.map(slide => <Banner key={slide.id} slide={slide}></Banner>)
                }
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 w-3/4 mx-auto items-center my-8'>
                <div className='col-span-1'>
                    <img src={pic7} alt="" />
                </div>
                <div className='col-span-1'>
                    <h4 className='text-blue-600 font3semibold'>About us</h4>
                    <p className='text-4xl font-semibold'>We are qualified and experienced in this field</p>
                    <p>We are succecfully running this business more then 20 years. we are one of the most experience company of Bangladesh in this field. We sell filters in many well known company of our country. We supply filter all over country.</p>
                </div>
            </div>
            <Categories></Categories>
        </div>
    );
};

export default Home;