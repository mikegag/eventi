import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/Landing"
import Error from './pages/Error'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App