import { motion } from "framer-motion"
import React from "react"
import { useNavigate, Link } from "react-router-dom"

interface HeaderProps {
    useCase: 'default' | 'protected'
}

export default function Header({useCase}:HeaderProps){
    const navigate = useNavigate()

    const handleLogout = async () => {
        //implement logic
        navigate('/login')
    }
    return (
        useCase === 'default'? (
            <div className="header-container">
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
                <Link to={'/dashboard'} className="w-24 mt-auto mb-auto ml-0 mr-auto cursor-pointer">
                    <img 
                        src={require("../assets/eventi-logo-small.png")} 
                        role="button"
                        aria-label="eventi logo, spelled normally except 'v' is replaced with a heart and 'i' is replaced with a location dot symbol"
                    />
                </Link>
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link to={'/dashboard/profile'} className="mt-auto mb-auto ml-auto mr-3 lg:mr-5">
                        <button 
                            className="header-btn"
                            aria-label="login button which redirects to login page"
                        >
                            Profile
                        </button>
                    </Link>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link to={'/'} className="mt-auto mb-auto ml-0 mr-0">
                        <button 
                            className="header-btn"
                            aria-label="login button which redirects to login page"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </Link>
                </motion.button>
        </div>
        )
    )
}