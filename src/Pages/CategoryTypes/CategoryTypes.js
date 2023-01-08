import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const CategoryTypes = () => {
    const datas = useLoaderData()
    const [selectedDatas, setSelectedDatas] = useState(null)
    const handleType = type => {
        setSelectedDatas(null)
        console.log(type)
        const Type = datas.filter(data => data.type === type)
        if (!Type.length) {
            return toast.error('No filter available for this type')
        }
        setSelectedDatas(Type)
    }
    console.log(selectedDatas)
    return (
        <div>
            <div className='my-10 w-3/4 mx-auto'>
                <h1 className='text-xl lg:text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-800'>What type of filter you want to see?</h1>
                <div className='grid grid-cols-3 gap-2 my-4'>
                    <div onClick={() => handleType('Air Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">AIR FILTER</h2>
                        </div>
                    </div>
                    <div onClick={() => handleType('Oil Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">OIL FILTER</h2>
                        </div>
                    </div>
                    <div onClick={() => handleType('Hydaulic Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">HYDAULIC FILTER</h2>
                        </div>
                    </div>
                    <div onClick={() => handleType('Line Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">LINE FILTER</h2>
                        </div>
                    </div>
                    <div onClick={() => handleType('Separetor Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">SEPARETOR FILTER</h2>
                        </div>
                    </div>
                    <div onClick={() => handleType('Dust Collector Filter')} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">DUST COLLECTOR FILTER</h2>
                        </div>
                    </div>
                </div>
                {
                    selectedDatas?.length && <p>{selectedDatas.length}</p>
                }
            </div>
        </div>
    );
};

export default CategoryTypes;