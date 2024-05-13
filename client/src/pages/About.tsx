import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function About(){
    return (
        <>
            <Header />
            <h3 className="page-title">What is Eventi?</h3>
            <img 
                src={require("../assets/couple-love.png")} 
                className="w-60 mt-14 mb-14 ml-auto mr-auto lg:w-72"
            />
            <p className="text-center text-main-color-lightgrey text-xl md:px-44"> 
                Eventi is app designed to take the stress out of your next date night. 
                Eventi will recommend date ideas based on your preferences and provide you with custom tailored options. 
                You can also save and modify ideas for future use allowing you to easily access them on your next date night.
            </p>
            <Footer />
        </>
    )
}