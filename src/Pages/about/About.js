import React, { useRef } from 'react';
import { BsTelephoneInbound } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { GoMailRead } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';

const About = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const form = useRef()
    //console.log(form.current)
    const handleClientEmail = (data, event) => {
        event.preventDefault()
        //console.log(data)
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                if (result.text) {
                    return toast.success('Email send successfully')
                    event.target.reset()
                }
            }, (error) => {
                console.log(error.text);
            });

    }
    return (
        <div>
            <div className='border border-y-4 border-x-0 my-16 py-20'>
                <div className='w-11/12 mx-auto'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-5xl font-bold'>Contact</h1>
                        <p>Get in touch</p>
                    </div>
                </div>
            </div>
            <div className='w-11/12 mx-auto mb-10'>
                <iframe className='w-full h-60' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d911.9373381006567!2d90.40862021532244!3d23.89850513006865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4538eb091b1%3A0xd94ee257660c16ed!2sAmtoli%20Tongi!5e0!3m2!1sen!2sbd!4v1673001629024!5m2!1sen!2sbd" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='w-11/12 mx-auto grid grid-cols-3 items-center'>
                <div className='font-semibold'>
                    <div className='flex gap-4 items-center'>
                        <BsTelephoneInbound></BsTelephoneInbound><p>01786580192</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <GrLocation></GrLocation><p>Amtoli, Station raod, Tongi, Gazipur</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <GoMailRead></GoMailRead><p>smmaruf25@gmail.com</p>
                    </div>
                </div>
                <form ref={form} onSubmit={handleSubmit(handleClientEmail)} className='my-10 col-span-2'>
                    <h1 className='text-3xl font-semibold'>How can we help you?</h1>
                    <p>send us email directly</p>
                    <div className="divider w-60"></div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <input {...register('name', { required: 'Need to entry your name' })} type="text" placeholder="Full Name" className="input input-bordered w-full rounded-sm mb-2" />
                            {errors.name && <p className='text-red-500 my-1'>{errors.name.message}</p>}
                            <input {...register('email', { required: 'Give your email', })} type="email" placeholder="Email" className="input input-bordered w-full rounded-sm" />
                            {errors.email && <p className=' text-red-500 my-1'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <textarea {...register('message', { required: 'Type your message' })} className="w-full textarea textarea-bordered rounded-sm h-full" placeholder="Massage"></textarea>
                            {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
                        </div>
                    </div>
                    <input type='submit' className="btn btn-outline btn-primary mt-2 w-3/12" value='Send' />
                </form>
            </div>
        </div >
    );
};

export default About;