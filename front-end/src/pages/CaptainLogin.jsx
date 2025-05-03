import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { CaptainDataContex } from '../context/CaptainContex';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContex);
    const submitHandler = async (e)=>{
        e.preventDefault();
        const captainData = {
            email:email,
            password:password
        }
        const response = await axios.post(`${import.meta.env.VITE_URL_API}/captain/login`,captainData)
        if(response.status === 200)
        {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-index')
        }
        setEmail('');
        setPassword('');
    }
  return (
    <div>
        <div className='h-screen w-full p-7 flex flex-col'>
            <div className='w-15 mb-8'><img className='w-full object-cover' src="https://pngimg.com/d/uber_PNG24.png" alt="" /></div>
            <form onSubmit={(e)=>{submitHandler(e)}} action="">
                <h3 className='text-2xl font-medium'>What is You'r email ?</h3>
                <input 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}} 
                className='bg-[#eeeeee] w-full mt-4  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl' 
                required type="email" 
                placeholder='captain@example.com' 
                />
                <h3 className='text-2xl font-medium mt-6'>Password</h3>
                <input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                required 
                className='bg-[#eeeeee] w-full mt-4  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl'  
                type="password" 
                placeholder='Password' 
                />
                <button className='block mt-8 text-xl font-semibold py-3 rounded-lg w-full bg-black text-white '>Login</button>
            </form>
            <p className='mt-4 text-md font-medium '>Join us As Patner <Link className='text-blue-600 underline' to={'/captain-register'}>Create a New Account ?</Link></p>
            <Link to={'/login'} className='flex items-center justify-center mt-2 text-xl font-semibold py-3 rounded-lg w-full bg-[#744C3A] text-white '>Login as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
