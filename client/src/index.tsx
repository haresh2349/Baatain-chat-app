import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './app.css'
import './index.css'
import { AuthProvider } from './contexts/auth-context';
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement as HTMLElement) // New createRoot API

if (!rootElement) {
  throw new Error("Failed to find the root element.");
}

root.render(
    <> 
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </>
)
