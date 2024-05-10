import React from "react"

export default function Footer(){
    return (
        <div className="footer-container">
            <p className="cursor-pointer hover:text-main-color-yellow active:text-main-color-yellow"> About</p>
            <p className="ml-4 mr-4"> • </p>
            <p className="cursor-pointer hover:text-accent-color-darkyellow active:text-main-color-yellow">FAQ's</p>
        </div>
    )
}