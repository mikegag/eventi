import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faArrowLeftLong, faSignature } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"

interface PersonalDataProps {
    username: string
    email: string,
    fullname: string
}

export default function PersonalInformation(){
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [personalData, setPersonalData] = useState<PersonalDataProps>({ 
        username: '',
        email: '',
        fullname: ''
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

    function deleteAccount(){
        const csrftoken = getCookie('csrftoken')
        axios.post('/api/delete-account/', {},{
            headers: {
            'X-CSRFToken': csrftoken,
        }
        })
        .then(res=> {
            if(res.status === 200){
                navigate('/')
            }
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })
    }

    useEffect(() => {
        document.title = "Personal Information"
        const csrftoken = getCookie('csrftoken')
        axios.get('/api/dashboard/profile/personal-information/', {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            setPersonalData(res.data)
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
            <h3 className="page-title mt-6 lg:mt-2"> Personal Information</h3>
            <form className="flex flex-col md:w-3/5 mx-auto">
            {!isOpen?
            <>
                <label htmlFor="name" className="form-label">
                    <FontAwesomeIcon icon={faUser} className="mr-3"/>
                    FullName
                </label>
                <input
                    name="name"
                    type="text"
                    disabled 
                    className="form-input-alternative placeholder:text-main-color-lightgrey mb-5"
                    placeholder={personalData.fullname !== ""? personalData.fullname : "-"}
                />
                <label htmlFor="username" className="form-label">
                    <FontAwesomeIcon icon={faSignature} className="mr-3"/>
                    Username
                </label>
                <input
                    name="username"
                    type="text"
                    disabled 
                    className="form-input-alternative placeholder:text-main-color-lightgrey mb-5"
                    placeholder={personalData.username !== ""? personalData.username : "-"}
                />
                <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-3"/>
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    disabled
                    className="form-input-alternative placeholder:text-main-color-lightgrey"
                    placeholder={personalData.email !== ""? personalData.email : "-"}
                />
            </>
            :   <p className="text-lg text-main-color-lightgrey mx-auto text-center mt-10">
                    Are you sure you want to delete your account? All data and information will be lost.
                </p>  
            }

                {isOpen ? (
                    <div className="flex justify-center">
                    <button 
                        type="submit" 
                        onClick={(e) => {
                            e.preventDefault();
                            deleteAccount()
                        }} 
                        className="form-submit-btn w-fit mx-3"
                    >
                        Permanently Delete
                    </button>   
                    <button
                        type="submit"
                        onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                        }}
                        className="form-submit-btn bg-main-color-lightgrey w-fit mx-4"
                    >
                        Cancel
                    </button>
                    </div>
                    ) : (
                    <button
                        type="submit"
                        onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                        }}
                        className="form-submit-btn w-fit mx-auto"
                    >
                        Delete Account
                    </button>
                )}
            </form>
        </>
    )
}