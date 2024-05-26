import React, {useState} from "react"
import Header from "../components/Header"
import DashboardCard from "../components/DashboardCard"
import LargeButtonCard from "../components/LargeButtonCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-regular-svg-icons"
import { faCalendar, faCompass } from "@fortawesome/free-solid-svg-icons"


export default function Dashboard(){
    const [readyToDisplay, setReadyToDisplay] = useState<boolean>(false)

    function formatGraphData(){
        // implement data taken from smallbuttoncard
    }

    return (
        <>
            <Header useCase="protected"/>
            <div className=" mx-auto">
                <p className="mr-auto ml-0 mt-12 mb-10 text-3xl font-semibold text-main-color-lightgrey underline underline-offset-4">Hi, username</p>
                <div className="flex mb-6">
                    <div className="flex flex-col justify-start bg-main-color-yellow px-8 py-2 rounded-xl mr-7 border-2 border-neutral-500">
                        <p className="text-sm my-2"><FontAwesomeIcon icon={faLightbulb} className="mr-1 text-lg"/> Total Dates Created</p>
                        <h3 className="text-lg">1200</h3>
                    </div>
                    <div className="flex flex-col justify-start bg-main-color-lightgrey px-8 py-2 rounded-xl mr-7">
                        <p className="text-sm my-2"> <FontAwesomeIcon icon={faCompass} className="mr-1 text-lg"/> Most visited Area</p>
                        <h3 className="text-lg">Toronto</h3>
                    </div>
                    <div className="flex flex-col justify-start bg-main-color-lightgrey px-8 py-2 rounded-xl mr-7">
                        <p className="text-sm my-2"><FontAwesomeIcon icon={faCalendar} className="mr-1 text-lg"/> Last time you went on a date</p>
                        <h3 className="text-lg">Monday, April 20, 2024</h3>
                    </div>
                </div>
                <LargeButtonCard useCase="generate" />
            </div>
        </>
    )
}