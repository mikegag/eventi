import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import LandingPage from "./pages/Landing"
import Login from './pages/Login'
import SignUp from './pages/Signup'
import About from './components/About'
import Faqs from './pages/Faqs'
import Error from './pages/Error'
import RouteAuthentication from "./components/RouteAuthentication"
import Dashboard from './pages/protected/Dashboard'
import Profile from './pages/protected/Profile'
import AddIdea from './pages/protected/AddIdea'
import GenerateIdea from './pages/protected/GenerateIdea'
import DateList from './pages/protected/DateList'
import ProfilePreferences from './pages/protected/ProfilePreferences'
import PersonalInformation from './pages/protected/PersonalInfomation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="about" element={<About />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="dashboard" element={<RouteAuthentication />} >
          <Route index element={<Dashboard />} />
          <Route path="add-idea" element={<AddIdea />} />
          <Route path="generate-idea" element={<GenerateIdea />} />
          <Route path="date-list" element={<DateList />} />
          <Route path="profile" element={<Outlet />} >
            <Route index element={<Profile />} />
            <Route path="profile-preferences" element={<ProfilePreferences/>}/>
            <Route path="personal-information" element={<PersonalInformation/>}/>
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App