import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
    if(!token)
            {
                navigate('/login')
            }
    }, [token])
    axios.get(`${import.meta.env.VITE_URL_API}/users/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((responce)=>{
      if(responce === 200)
      {
        const data = responce.data
        setUser(responce.data.user)
        setIsLoading(false)
      }
    }).catch(err =>{
      console.log(err);
      localStorage.removeItem('token')
      navigate('/login');
    })
    if(isLoading)
    {
      return(
        <div>Loading........</div>
      )
    }
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectWrapper