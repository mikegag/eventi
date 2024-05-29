import React from "react"
import data from "../Data.json"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function About(){
    return (
        <>
            {/* <Header useCase="default" /> */}
            <h3 className="page-title">What is Eventi?</h3>
            <img 
                src={require("../assets/couple-love.png")} 
                className="w-60 mt-14 mb-14 ml-auto mr-auto lg:w-72"
            />
            <p className="text-center text-main-color-lightgrey text-xl md:px-44"> 
                {data.aboutSection.description}
            </p>
            {/* <Footer /> */}
        </>
    )
}