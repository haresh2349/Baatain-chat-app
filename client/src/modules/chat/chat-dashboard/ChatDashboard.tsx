import React from 'react'
import Styles from './chat-dashboard.module.css'
import { ChatList } from '../components/chat-list/ChatList'
import { WebNavbar } from '../../../components/navbar/Navbar'
import { ChatCard } from '../components/chat-card/ChatCard'

export const ChatDashboard = () => {
  return (
    <div className={Styles.dashboard_container}>
      <WebNavbar />
      <div className={Styles.section_container}>
        <ChatList />
        <ChatCard />
      </div>
    </div>
  )
}
