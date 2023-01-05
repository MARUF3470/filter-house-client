import React from 'react';
import './banner.css'
import Typewriter from 'typewriter-effect';
const Banner = ({ slide }) => {
    const { image, id, prev, next } = slide
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full ">
            <div className='carousel-img '>
                <img src={image} alt='' className="w-full border-none h-full rounded-xl" />
            </div>
            <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-3">
                <a href={`#slide${prev}`} className="btn btn-circle">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
            <div className="absolute transform -translate-y-1/2 left-5 lg:left-20 top-1/3">
                <h1 className='text-lg lg:text-6xl text-white font-bold'>We manufacture <br /> and supply all kind of engine's</h1>
            </div>
            <div className="absolute transform -translate-y-1/2 left-5 lg:left-20 top top-2/4">
                <p className='text-sm lg:text-2xl font-semibold  text-yellow-300'>
                    <Typewriter
                        options={{
                            strings: ['Air Filter', 'Oil Filter', 'Hydaulic Filter', 'Dust Collector Filter', 'Air Compressor Line Filter', 'Separetor Filter', 'Hepa Filter'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </p>
            </div>
            <div className="absolute transform -translate-y-1/2 left-5 lg:left-20 top-3/4 hidden lg:block">
                <button className="btn btn-secondary mr-4">Discover More</button>
                <button className="btn btn-outline btn-warning">Latest Projects</button>
            </div>
        </div >
    );
};

export default Banner;