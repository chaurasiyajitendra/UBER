import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { CaptainDataContex } from '../context/CaptainContex';
import axios from 'axios';


const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {captain,setCaptain} = useContext(CaptainDataContex)
    const [isloading ,setIsloading] =useState(false)
    useEffect(() => {
        if(!token)
        {
            navigate('/captain-login')
        }
    }, [token])
    axios.get(`${import.meta.env.VITE_URL_API}/captain/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((responce)=>{
      if(responce === 200)
      {
        const data = responce.data
        setCaptain(responce.data.captain)
        setIsloading(false)
      }
    }).catch(err =>{
      console.log(err);
      localStorage.removeItem('token')
      navigate('/captain-login');
    })

    if(isloading)
    {
      return (
        <div>Loading.....</div>
      )
    }

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper