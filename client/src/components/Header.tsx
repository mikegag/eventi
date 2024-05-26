import React from "react"
import { Link } from "react-router-dom"

interface HeaderProps {
    useCase: 'default' | 'protected'
}

export default function Header({useCase}:HeaderProps){
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
                    <button 
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                    >
                        Login
                    </button>
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
                <Link to={'/profile'} className="mt-auto mb-auto ml-auto mr-3 lg:mr-5">
                    <button 
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                    >
                        Profile
                    </button>
                </Link>
                <Link to={'/logout'} className="mt-auto mb-auto ml-0 mr-0">
                    <button 
                        className="header-btn"
                        aria-label="login button which redirects to login page"
                    >
                        Logout
                    </button>
                </Link>
        </div>
        )
    )
}