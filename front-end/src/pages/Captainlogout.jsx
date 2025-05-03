import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Captainlogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_URL_API}/captain/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((responce)=>{
        if(responce.status === 200)
        {
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    })

  return (
    <div></div>
  )
}

export default Captainlogout