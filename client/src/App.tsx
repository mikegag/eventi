import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/Landing"
import Login from './pages/Login'
import About from './pages/About'
import Error from './pages/Error'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App