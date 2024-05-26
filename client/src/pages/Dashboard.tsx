import React, {useEffect, useState} from "react"
import Header from "../components/Header"
import DashboardCard from "../components/DashboardCard"
import LargeButtonCard from "../components/LargeButtonCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
import { faCalendar, faCompass } from "@fortawesome/free-solid-svg-icons"
import SmallButtonCard from "../components/SmallButtonCard"


export default function Dashboard(){
    const [readyToDisplay, setReadyToDisplay] = useState<boolean>(false)

    //handles which graph should be displayed based on clicked SmallButtonCard
    function displayData(data:boolean){
        // implement data taken from smallbuttoncard
        setReadyToDisplay(data)
        console.log(readyToDisplay)
    }

    function formatGraphData(){
        // implement data taken from smallbuttoncard
    }

    return (
        <>
            <Header useCase="protected"/>
            <div className="mx-auto">
                <p className="mr-auto ml-0 mt-14 mb-10 text-2xl font-semibold text-main-color-lightgrey underline underline-offset-4">Hi, username</p>
                <div className="flex mb-6">
                    <SmallButtonCard useCase="total" graphData="1002" readyToDisplay ={displayData} />
                    <SmallButtonCard useCase="location" graphData="Toronto" readyToDisplay ={displayData} />
                    <SmallButtonCard useCase="time" graphData="Monday, April 3, 2024" readyToDisplay ={displayData} />
                </div>
                <div className="flex bg-accent-color-darkgreen rounded-xl py-3 px-7">
                    <div className="ml-auto mr-0">
                        <LargeButtonCard useCase="generate" />
                        <LargeButtonCard useCase="add" />
                        <LargeButtonCard useCase="list" />
                    </div>
                </div>
            </div>
        </>
    )
}