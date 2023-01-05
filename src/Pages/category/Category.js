import React from 'react';
import { Link } from 'react-router-dom';
const Category = ({ category }) => {
    console.log(category)
    return (
        <Link>
            <div className="card w-60 lg:w-96 bg-base-100 shadow-xl image-full">
                <figure><img src="https://media.istockphoto.com/id/1249888857/photo/the-truck-runs-on-the-highway-with-speed.jpg?s=612x612&w=0&k=20&c=qM_euCJj-QUTz8GeBlMG-lWZffFGQ45xvXos1Pf4Opo=" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-yellow-50">{category.name}</h2>
                </div>
            </div>
        </Link>


    );
};

export default Category;