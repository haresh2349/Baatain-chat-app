import React, { useEffect, useState } from 'react'
import Login from './modules/auth/login/Login'
import { useTheme } from './contexts/ThemeContext'
import image from './resources/image.png'
import Signup from './modules/auth/signup/Signup'
import { useAuth } from './contexts/auth-context'
import { ChatDashboard } from './modules/chat/chat-dashboard/ChatDashboard'
import { connectSocket } from './services/socket-service'

const App: React.FC = () => {
  const { toggleTheme } = useTheme()
  const { isLoggedIn } = useAuth()
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    connectSocket()
  }, [])
  return (
    <>
      {isLoggedIn ? (
        <ChatDashboard />
      ) : showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Signup setShowLogin={setShowLogin} />
      )}
    </>
  )
}

export default React.memo(App)
