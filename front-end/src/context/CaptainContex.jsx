import React, { Children, createContext, useState } from 'react'

export const CaptainDataContex = createContext();
const CaptainContex = ({children}) => {
    const [captain, setCaptain] = useState(null);
    const [isLoadin, setIsLoadin] = useState(false);
    const [error, setError] = useState(false);

    const upadateCaptain = (captainData)=>{
        setCaptain(captainData);
    }
    const value ={
        captain,
        setCaptain,
        isLoadin,
        setIsLoadin,
        error,
        setError,
        upadateCaptain
    }
  return (
    <CaptainDataContex.Provider value={{captain,setCaptain}}>
        {children}
    </CaptainDataContex.Provider>
  )
}

export default CaptainContex