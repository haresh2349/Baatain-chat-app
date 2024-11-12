import App from './App'
import ReactDOM from 'react-dom/client'
import React from 'react'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement as HTMLElement) // New createRoot API
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
