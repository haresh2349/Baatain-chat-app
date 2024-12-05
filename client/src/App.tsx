import React, { useEffect, useState } from 'react'
import Login from './modules/auth/login/Login'
import { useTheme } from './contexts/ThemeContext'
import image from "./resources/image.png"
import Signup from './modules/auth/signup/Signup'

const App : React.FC = () => {
  const {toggleTheme} = useTheme();
  const [showLogin,setShowLogin] = useState(true);
  useEffect(()=> {
    setTimeout(() => {
      toggleTheme()
    },5000)
  },[])
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!showLogin && <Signup setShowLogin={setShowLogin}/>}
    </>
  )
}

export default React.memo(App)
