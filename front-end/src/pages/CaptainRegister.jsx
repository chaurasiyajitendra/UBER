import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainRegister = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');
    const submitHandler =(e)=>{
        e.preventDefault();
        setUserData({
            fullName:{firstName:firstname,lastName:lastname},
            email:email,
            password:password
        });
        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
        console.log(userData);
    }
  return (
    <div>
    <div className='h-screen w-full p-7 flex flex-col'>
        <div className='w-15 mb-10'><img className='w-full' src="https://pngimg.com/d/uber_PNG24.png" alt="" /></div>
        <form onSubmit={(e)=>{submitHandler(e)}} action="">
            <h3 className='text-xl font-medium'>What is You'r name ?</h3>
            <div className='flex gap-4'>
            <input
            value={firstname}
            onChange={(e)=>{setFirstname(e.target.value)}} 
            className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl' 
            required 
            type="text" 
            placeholder='First name' 
            />
            <input 
            value={lastname}
            onChange={(e)=>{setLastname(e.target.value)}}
            className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl' 
            type="text" 
            placeholder='Last name' 
            />
            </div>
            <h3 className='text-xl font-medium mt-6'>What is You'r email ?</h3>
            <input 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className='bg-[#eeeeee] w-full mt-2  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl' 
            required type="email" 
            placeholder='user@example.com' 
            />
            <h3 className='text-xl font-medium mt-6'>Password</h3>
            <input 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required 
            className='bg-[#eeeeee] w-full mt-2  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl'  
            type="password" 
            placeholder='Password' 
            />
            <button className='block mt-8 text-lg font-semibold py-3 rounded-lg w-full bg-black text-white '>Register</button>
        </form>
        <p className='mt-4 text-sm font-medium text-center '>Alredy have Account? <Link className='text-blue-600 underline' to={'/captain-login'}>Log in</Link></p>
    </div>
    </div>
  )
}

export default CaptainRegister
