import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import About from "../components/About"
import { motion } from "framer-motion"
import Example from "../components/Example"
import Faqs from "../components/Faqs"

export default function Landing(){
    useEffect(() => {
        document.title = "Eventi"
    }, [])
    
    return (
        <>
            <Header useCase="default" />
            <div className="content-container">
                <h1 className="landing-title">EVENTI</h1>
                <h2 className="landing-subtitle">Date night ideas & planning made easy.</h2>
                <Link to={'/signup'}>
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.9 }}
                        className="header-btn bg-main-color-yellow text-xl px-7 py-2 hover:bg-accent-color-darkyellow shadow-sm"
                        aria-label="redirects user to signup page"
                    >
                        Get Started
                    </motion.button>
                </Link>
                <section className="mt-72 mb-32 lg:mb-36">
                    <About />
                </section>
                <section>
                    <Example />
                </section>
                <section className="mt-32 mb-28 w-full lg:mt-40">
                    <Faqs />
                </section>
            </div>
            <Footer/>
        </>
    )
}