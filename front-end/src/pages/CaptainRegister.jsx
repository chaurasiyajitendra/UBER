import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainContex, { CaptainDataContex } from '../context/CaptainContex';
import axios from 'axios';

const CaptainRegister = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapcity, setVehicleCapcity] = useState('');
    const [vehicleType, setVehicleType] = useState('');


    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContex);


    const submitHandler = async (e)=>{
        e.preventDefault();
        const captainData ={
            fullname:{firstname:firstname,lastname:lastname},
            email:email,
            password:password,
            vehicle:{color:vehicleColor,plate:vehiclePlate,capcity:vehicleCapcity,vehicleType:vehicleType}
        }

        const responce = await axios.post(`${import.meta.env.VITE_URL_API}/captain/register`,captainData)
        if(responce.status === 201)
        {
            const data = responce.data
            setCaptain(responce.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-index');
        }
        
        setEmail('');
        setFirstname('');
        setLastname('');
        setPassword('');
        setVehicleCapcity('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleType('');
    }
  return (
    <div>
    <div className='h-screen w-full p-6 flex flex-col'>
        <div className='w-15 mb-4'><img className='w-full' src="https://pngimg.com/d/uber_PNG24.png" alt="" /></div>
        <form onSubmit={(e)=>{submitHandler(e)}} action="">
            <h3 className='text-xl font-medium'>What is You'r name ?</h3>
            <div className='flex gap-4'>
            <input
            value={firstname}
            onChange={(e)=>{setFirstname(e.target.value)}} 
            className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg' 
            required 
            type="text" 
            placeholder='First name' 
            />
            <input 
            value={lastname}
            onChange={(e)=>{setLastname(e.target.value)}}
            className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg' 
            type="text" 
            placeholder='Last name' 
            />
            </div>
            <h3 className='text-xl font-medium mt-4'>What is You'r email ?</h3>
            <input 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className='bg-[#eeeeee] w-full mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg' 
            required type="email" 
            placeholder='user@example.com' 
            />
            <h3 className='text-xl font-medium mt-4'>Password</h3>
            <input 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required 
            className='bg-[#eeeeee] w-full mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg'  
            type="password" 
            placeholder='Password' 
            />
            <h3 className='text-xl font-medium mt-4'>Vehicle Information</h3>
            <div className='flex items-center gap-4 justify-center'>
                <input 
                value={vehicleColor}
                onChange={(e)=>{setVehicleColor(e.target.value)}}
                type="text"
                placeholder='Vehicle Color'
                required 
                className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg'
                 />
                <input 
                value={vehiclePlate}
                onChange={(e)=>{setVehiclePlate(e.target.value)}}
                type="text"
                placeholder='Vehicle Plate'
                required 
                className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg'
                 />
            </div>
            <div className='flex items-center gap-4 justify-center'>
                <input 
                value={vehicleCapcity}
                onChange={(e)=>{setVehicleCapcity(e.target.value)}}
                type='number'
                placeholder='Vehicle Capcity'
                required 
                className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg'
                 />
                 <select
                 required
                 value={vehicleType}
                 onChange={(e)=>{setVehicleType(e.target.value)}} 
                className='bg-[#eeeeee] w-1/2 mt-2  px-4 py-1 border-zinc-300 rounded-md border-2 text-lg'
                 >
                    <option value="" disabled>Select Vehicle</option>
                    <option value="car">Car</option>
                    <option value="moto">Moto</option>
                    <option value="auto">Auto</option>
                 </select>
            </div>
            <button className='block mt-6 text-lg font-semibold py-3 rounded-lg w-full bg-black text-white '>Register</button>
        </form>
        <p className='mt-4 text-sm font-medium text-center '>Alredy have Account? <Link className='text-blue-600 underline' to={'/captain-login'}>Log in</Link></p>
    </div>
    </div>
  )
}

export default CaptainRegister
