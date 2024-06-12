import { motion } from "framer-motion"
import React from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

interface HeaderProps {
    useCase: 'default' | 'protected'
}

export default function Header({useCase}:HeaderProps){
    const navigate = useNavigate()

    //gets csfr authentication cookie
    function getCookie(name:string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue
    }

    function handleLogout(event: React.FormEvent): void {
        event.preventDefault()
        const csrftoken = getCookie('csrftoken')
        console.log(csrftoken)
        axios.post('/api/logout/',{}, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(res=> {
            if (res.status === 200) {
                navigate('/')
            } else {
                console.error("Logout failed")
            }
        })
        .catch(error => {
            if (error.response) {
                // the server responded with a status code that falls out of the range of 2xx
                console.error('Error response:', error.response.data)
                console.error('Status:', error.response.status)
                console.error('Headers:', error.response.headers)
            } else if (error.request) {
                // no response was received
                console.error('No response received:', error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message)
            }
            console.error('Error config:', error.config)
        })
    }

    return (
        useCase === 'default'? (
            <div className="header-container">
                <p id="hidden_user_email" className="hidden absolute opacity-0">s</p>
                <Link to={'/'} className="w-24 mt-auto mb-auto ml-0 mr-auto cursor-pointer">
                    <img 
                        src={require("../assets/eventi-logo-small.png")} 
                        role="button"
                        aria-label="eventi logo, spelled normally except 'v' is replaced with a heart and 'i' is replaced with a location dot symbol"
                    />
                </Link>
                <Link to={'/login'} className="mt-auto mb-auto ml-auto mr-0">
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.9 }}
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                    >
                        Login
                    </motion.button>
                </Link>
            </div>
        )
        :
        (
            <div className="header-container">
                <p id="hidden_user_email" className="hidden absolute opacity-0">s</p>
                <Link to={'/dashboard'} className="w-24 mt-auto mb-auto ml-0 mr-auto cursor-pointer">
                    <img 
                        src={require("../assets/eventi-logo-small.png")} 
                        role="button"
                        aria-label="eventi logo, spelled normally except 'v' is replaced with a heart and 'i' is replaced with a location dot symbol"
                    />
                </Link>
                <Link to={'/dashboard/profile'} className="mt-auto mb-auto ml-auto mr-3 lg:mr-5">
                    <motion.button 
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                    >
                        Profile
                    </motion.button>
                </Link>
                <Link to={'/'} className="mt-auto mb-auto ml-0 mr-0">
                    <motion.button 
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.9 }}
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                        onClick={handleLogout}
                    >
                        Logout
                    </motion.button>
                </Link>
            </div>
        )
    )
}