import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainRegister'
import Index from './pages/Index'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainIndex from './pages/CaptainIndex'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Captainlogout from './pages/Captainlogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/Register' element={<UserRegister />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-register' element={<CaptainRegister/>}/>
        <Route path='/index' element={<UserProtectWrapper> <Index/> </UserProtectWrapper>}/>
        <Route path='/user/logout' element={<UserProtectWrapper> <UserLogout /> </UserProtectWrapper>} />
        <Route path='/captain-index' element={<CaptainProtectWrapper> <CaptainIndex/> </CaptainProtectWrapper>} />
        <Route path='/captain/logout' element={<CaptainProtectWrapper> <Captainlogout/> </CaptainProtectWrapper>} />
      </Routes>
    </div>
  )
}

export default App
