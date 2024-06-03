import React, { useEffect } from "react"
import Header from "../../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faWrench } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"

export default function Profile(){
    useEffect(() => {
        document.title = "Profile"
    }, [])

    return (
        <>
            <Header useCase="protected"/>
            <Link to={'/dashboard'}>
                <FontAwesomeIcon 
                    icon={faArrowLeftLong} 
                    className="back-arrow"
                />
            </Link>
            <div className="profile-upper-container mb-16">
                <img src={require('../../assets/couple-love.png')} className="w-36 rounded-full border"/>
                <h4 className="mt-8 mb-3 font-semibold text-3xl">Mark Plum</h4>
                <p className="text-sm">Joined January 15, 2024</p>
            </div>  
            <Link to={"personal-information"}>
                <div className="profile-section-link">
                    <FontAwesomeIcon icon={faUser} />
                    <p className="ml-5">Personal Information</p>
                </div>
            </Link>
            <Link to={"profile-preferences"}>
                <div className="profile-section-link">
                    <FontAwesomeIcon icon={faWrench} />
                    <p className="ml-5">Profile Preferences</p>
                </div>
            </Link>
        </>
    )
}