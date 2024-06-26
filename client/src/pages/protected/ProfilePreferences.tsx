import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { faArrowLeftLong, faChampagneGlasses, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"

interface ProfileDataProps {
    location: string,
    partner: string,
    interests: string
}

export default function ProfilePreferences(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [profileData, setProfileData] = useState<ProfileDataProps>({ 
        location: '',
        partner: '',
        interests: ''
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
        document.title = "Profile Preferences"
        const csrftoken = getCookie('csrftoken')
        axios.get('/api/dashboard/profile/profile-preferences/', {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            setProfileData(res.data)
            console.log(profileData)
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })
    }, [])

    return (
        <>
            <Header useCase="protected"/>
            <Link to={'../'}>
                <FontAwesomeIcon 
                    icon={faArrowLeftLong} 
                    className="back-arrow"
                />
            </Link>
            <h3 className="page-title mt-6 lg:mt-2"> Preferences</h3>
            <form className="flex flex-col md:w-3/5 mx-auto">
                <label htmlFor="partner" className="form-label">
                    <FontAwesomeIcon icon={faHeart} className="mr-3"/>
                    Date Partner
                </label>
                <input
                    name="partner"
                    type="text"
                    disabled = {!isOpen? true : false}
                    className={`form-input mb-5 ${!isOpen? 'form-input-alternative':''}`}
                    placeholder={profileData.partner !== '' ? profileData.partner : "-"}
                /> 
                <label htmlFor="location" className="form-label">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-3"/>
                    Location (City or Area)
                </label>
                <input
                    name="location"
                    type="text"
                    disabled = {!isOpen? true : false}
                    className={`form-input mb-5 ${!isOpen? 'form-input-alternative':''}`}
                    placeholder={profileData.location !== '' ? profileData.location : "-"}
                />
                <label htmlFor="interests" className="form-label">
                    <FontAwesomeIcon icon={faChampagneGlasses} className="mr-3"/>
                    Interests (comma separated)
                </label>
                <input
                    name="interests"
                    type="text"
                    disabled = {!isOpen? true : false}
                    className={`form-input ${!isOpen? 'form-input-alternative':''}`}
                    placeholder={profileData.interests !== '' ? profileData.interests : "-"}
                />
                {isOpen ? (
                    <button 
                        type="submit" 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="form-submit-btn w-fit mx-auto"
                    >
                        Save
                    </button>
                    ) : (
                    <button
                        type="submit"
                        onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                        }}
                        className="form-submit-btn w-fit mx-auto"
                    >
                        Edit
                    </button>
                )}
            </form>
        </>
    )
}