import { faClipboardList, faMagnifyingGlassPlus, faMartiniGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

export default function DashboardCard(){
    return (
        <div className="flex flex-col justify-center items-center lg:flex-row">
            <div className="border-2 border-accent-color-black rounded-xl cursor-pointer bg-main-color-lightgrey mb-7 px-20 py-16 mr-auto ml-auto w-fit ">
                <Link to={'/generate-idea'} className="flex flex-row justify-center items-center text-2xl text-accent-color-black">
                    <p className="mr-5"> Generate Idea </p>
                    <FontAwesomeIcon icon={faMartiniGlass} />
                </Link>
            </div>
            <div className="border-2 border-accent-color-black rounded-lg cursor-pointer bg-main-color-lightgrey mb-7 px-20 py-16 mr-auto ml-auto w-fit">
                <Link to={'/add-idea'} className="flex flex-row justify-center items-center text-2xl text-accent-color-black">
                    <p className="mr-5"> Add Date Idea </p>
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus}/>
                </Link>
            </div>
            <div className="border-2 border-accent-color-black rounded-lg cursor-pointer bg-main-color-lightgrey mb-7 px-20 py-16 mr-auto ml-auto w-fit">
                <Link to={'/date-list'} className="flex flex-row justify-center items-center text-2xl text-accent-color-black">
                    <p className="mr-5"> View Date List </p>
                    <FontAwesomeIcon icon={faClipboardList} />
                </Link>
            </div>
        </div>
    )
}