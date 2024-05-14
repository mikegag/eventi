import React from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Landing(){
    return (
        <>
            <Header useCase="default" />
            <div className="content-container">
                <h1 className="landing-title">EVENTI</h1>
                <h2 className="landing-subtitle">Date night ideas & planning made easy.</h2>
                <Link to={'/signup'}>
                    <button className="header-btn bg-main-color-yellow text-xl px-7 py-2 hover:bg-accent-color-darkyellow shadow-sm"> 
                        Get Started
                    </button>
                </Link>
                
            </div>
            <Footer />
        </>
    )
}