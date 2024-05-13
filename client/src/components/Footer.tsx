import React from "react"
import { Link } from "react-router-dom"

export default function Footer(){
    return (
        <div className="footer-container">
            <Link to={'/about'}>
                <p className="cursor-pointer hover:text-main-color-yellow active:text-main-color-yellow"> About</p>
            </Link>
            <p className="ml-4 mr-4"> • </p>
            <Link to={'/faqs'}>
                <p className="cursor-pointer hover:text-accent-color-darkyellow active:text-main-color-yellow">FAQ's</p>
            </Link>
        </div>
    )
}