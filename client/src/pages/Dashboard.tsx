import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Dashboard(){
    return (
        <>
            <Header useCase="protected"/>
            <p className="mr-auto ml-0">Hi, username</p>
            <div className="w-full rounded-2xl h-1 bg-main-color-yellow"></div>
        </>
    )
}