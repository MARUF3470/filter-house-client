import React from 'react';
import Category from './Category';
import './category.css'

const Categories = () => {
    const categories = [
        {
            id: "01",
            name: 'Industrial Vehicles Filters',
            pic: 'https://media.istockphoto.com/id/1249888857/photo/the-truck-runs-on-the-highway-with-speed.jpg?s=612x612&w=0&k=20&c=qM_euCJj-QUTz8GeBlMG-lWZffFGQ45xvXos1Pf4Opo='
        },
        {
            id: "02",
            name: 'Ship Filters',
            pic: 'https://d1e00ek4ebabms.cloudfront.net/production/c0243c91-26b6-4799-9ea1-781b6b10718b.jpg'
        },
        {
            id: '03',
            name: 'Generator Filters',
            pic: 'https://media.istockphoto.com/id/451626711/photo/standby-generator-installed-indoors.jpg?s=612x612&w=0&k=20&c=HvnTry_xm4kC8sTndAi5CkcgYzWTEB8gXwM7ZsarLps='
        },
        {
            id: '04',
            name: 'Air Compressor Filters',
            pic: 'https://indoair.com/images/indoair-product-home.webp'
        },
        {
            id: '05',
            name: 'Industrial Filter',
            pic: 'https://www.windpowerengineering.com/wp-content/uploads/2017/10/Wartsila-50SG.png'
        }
    ]
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-4xl text-center font-bold mb-5'>Category</h1>
            <div className='overflow-x-auto scrollable-component mb-5'>
                <div className='flex gap-3 '>
                    {
                        categories.map(category => <Category key={category.id} category={category}></Category>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;