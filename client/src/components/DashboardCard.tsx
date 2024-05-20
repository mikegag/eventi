import { faClipboardList, faMagnifyingGlassPlus, faMartiniGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

export default function DashboardCard(){
    return (
        <div className="flex flex-col justify-center items-center lg:flex-row">
            <Link to={'/generate-idea'}>
                <div className="card">
                    <p className="mr-5"> Generate Idea </p>
                    <FontAwesomeIcon icon={faMartiniGlass} />
                </div>
            </Link>
            <Link to={'/add-idea'} >
                <div className="card">
                <p className="mr-5"> Add Date Idea </p> 
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus}/>
                </div>
            </Link>
            <Link to={'/date-list'}>
                <div className="card">
                    <p className="mr-5"> View Date List </p>
                    <FontAwesomeIcon icon={faClipboardList} />
                </div>
            </Link>
        </div>
    )
}