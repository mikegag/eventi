import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/Landing"
import Login from './pages/Login'
import SignUp from './pages/Signup'
import About from './pages/About'
import Faqs from './pages/Faqs'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AddIdea from './pages/AddIdea'
import GenerateIdea from './pages/GenerateIdea'
import DateList from './pages/DateList'
import ProfilePreferences from './pages/ProfilePreferences'
import PersonalInformation from './pages/PersonalInfomation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="add-idea" element={<AddIdea />} />
        <Route path="generate-idea" element={<GenerateIdea />} />
        <Route path="date-list" element={<DateList />} />
        <Route path="profile-preferences" element={<ProfilePreferences />} />
        <Route path="personal-information" element={<PersonalInformation />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App