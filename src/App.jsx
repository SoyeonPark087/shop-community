import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Community from './pages/Community'
import './App.css'

function App() {
  
  return (
    <>
      <h1>저희 쇼핑몰입니다.</h1>
      <Home><Home/>
      <Shop><Shop/>
      <Community><Community/>
    </>
  )
}

export default App