import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] })

type FormData = {
    email: string,
    password: string
}

export default function Login() {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const onSubmit = handleSubmit(data => {
    });

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-hidden bg-white">
            <div className='overflow-y-hidden'>
                <div className='flex flex-row justify-between items-center rounded-lg '>
                    <div className='w-1/2'>
                        <h1 className='text-4xl font-bold mb-2'>Data Exporter</h1>
                        <p className='text-left text-lg'>Making data export easier for teams for free. It supports common data formats like csv, and xlsx</p>
                    </div>
                    <div>
                        <header>
                            <h2 className='text-black text-2xl text-left'>Login here</h2>
                        </header>
                        <form onSubmit={onSubmit} className='flex items-center justify-center flex-col bg-white h-[400px] w-[400px] rounded-lg px-10'>
                            <div className='mb-5 w-[100%]'>
                                <input  {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} className='text-black w-full border-2 py-2 px-2 rounded-lg focus:outline-black' type='text' placeholder='Username or Email' />
                                {errors.email?.type === 'required' && <p className="text-sm text-red-700" role="alert">Email is required</p>}

                            </div>
                            <div className='w-[100%]'>
                                <input {...register("password", { min: 5, max: 10 })} className='text-black w-full border-2 px-2  py-2 rounded-lg focus:outline-black' type='password' placeholder='**********' />
                                {errors.password?.type === 'required' && <p className="text-sm text-red-700" role="alert">Password is required</p>}
                            </div>
                            <div className='mb-10 mt-7 w-[100%]'>
                                <button className='bg-black w-[100%] px-2 py-2 rounded-lg focus:outline-black'>Login</button>
                                <span>{loading && "loading..."}</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
