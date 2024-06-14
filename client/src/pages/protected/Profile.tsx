import React, { useEffect, useState } from "react"
import axios from "axios"
import Header from "../../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faWrench } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"

interface ProfileDataProps {
    fullname: string,
    date_joined: string,
    username: string
}
export default function Profile(){
    const [profileData, setProfileData] = useState<ProfileDataProps>({ 
        fullname: '',
        date_joined: '',
        username: ''
    })

    //gets csfr authentication cookie
    function getCookie(name:string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue
    }

    useEffect(() => {
        document.title = "Profile"
        const csrftoken = getCookie('csrftoken')
        axios.get('/api/dashboard/profile/', {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            setProfileData(res.data)
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })
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
                <h4 className="mt-8 mb-3 font-semibold text-3xl">
                    {profileData.fullname !== ''? profileData.fullname : "Loading..."}
                </h4>
                <p className="text-sm">
                    Joined: {profileData.date_joined !== ''? profileData.date_joined.slice(0,10) : "..." }
                </p>
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