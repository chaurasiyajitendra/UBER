import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_URL_API}/users/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((responce)=>{
        if(responce.status === 200)
        {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })
  return (
    <div></div>
  )
}

export default UserLogout