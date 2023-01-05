import React from 'react';
import Category from './Category';
import './category.css'

const Categories = () => {
    const categories = [
        {
            id: "01",
            name: 'Car Filters'
        },
        {
            id: "02",
            name: 'Ship Filters'
        },
        {

            id: '02',
            name: 'Generator Filters'
        },
        {
            id: '03',
            name: 'Air Compressor Filters'
        },
        {
            id: '04',
            name: 'Industrial Filter'
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