import React, { createContext } from 'react'

export const UserDataContext = createContext();
const userContext = ({children}) => {
  const you = 'jitendra';
  return (
    <div>
      <UserDataContext.Provider value={you}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default userContext
