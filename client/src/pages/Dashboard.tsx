import React from "react"
import Header from "../components/Header"
import DashboardCard from "../components/DashboardCard"

export default function Dashboard(){
    return (
        <>
            <Header useCase="protected"/>
            <div className=" ml-auto mr-auto">
                <p className="mr-auto ml-0 mt-12 mb-2 text-lg text-main-color-lightgrey">Hi, username</p>
                <div className="w-full rounded-2xl h-1 bg-main-color-yellow mb-28"></div>
                <DashboardCard />
            </div>
        </>
    )
}