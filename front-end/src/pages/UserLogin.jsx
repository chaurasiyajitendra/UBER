import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({})
    const {user,setUser} = useContext(UserDataContext);
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        const response = await axios.post(`${import.meta.env.VITE_URL_API}/users/login`, userData);
        if(response.status === 200)
        {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/index')
        }
        setEmail('');
        setPassword(''); 
    }

  return (
    <div>
        <div className='h-screen w-full p-7 flex flex-col'>
            <div className='w-15 mb-10'><img className='w-full' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /></div>
            <form onSubmit={(e)=>{submitHandler(e)}} action="">
                <h3 className='text-2xl font-medium'>What is You'r email ?</h3>
                <input 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}} 
                className='bg-[#eeeeee] w-full mt-4  px-4 py-2 border-zinc-300 rounded-md border-2 text-xl' 
                required type="email" 
                placeholder='user@example.com' 
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
            <p className='mt-4 text-md font-medium text-blue-600 underline'><Link to={'/register'}>Create a New Account ?</Link></p>
            <Link to={'/captain-login'} className='flex items-center justify-center mt-2 text-xl font-semibold py-3 rounded-lg w-full bg-[#744C3A] text-white '>Login as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
