import React, { useContext } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
const Home = () => {
  const ans = useContext(UserDataContext)
  console.log(ans);
  
  return (
    <div>
        <div className=' bg-cover bg-[url(https://files.prepinsta.com/wp-content/uploads/2025/03/Uber-Eligibility-Criteria-Latest-Details-1024x683.webp)] h-screen w-full flex flex-col justify-between'>
            <div className='w-15 mt-10 ml-6'><img className='w-full' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /></div>
            <div className='bg-white p-4'>
                <h2 className='text-2xl font-semibold'>Get started with Uber</h2>
                <Link to={'/login'} className='bg-black mt-4 mb-2 text-white w-full py-2 text-xl font-semibold flex items-center justify-center gap-3 rounded-xl'>Continue <FaArrowRight />  </Link>
            </div>
        </div>
    </div>
  )
}

export default Home
