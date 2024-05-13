import React from "react"
import { Link } from "react-router-dom"

export default function Header(){
    return (
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
}