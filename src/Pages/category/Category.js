import React from 'react';
import { Link } from 'react-router-dom';
const Category = ({ category }) => {
    //console.log(category)
    return (
        <Link to={`/category/${category.id}`}>
            <div className="card w-60 lg:w-96 bg-base-100 shadow-xl image-full h-32 lg:h-48">
                <figure><img src={category.pic} className='w-full' alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-yellow-50">{category.name}</h2>
                </div>
            </div>
        </Link>


    );
};

export default Category;