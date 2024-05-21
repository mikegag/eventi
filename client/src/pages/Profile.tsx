import React from "react"
import Header from "../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faWrench } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom"

export default function Profile(){
    const [open,setOpen] = useState(false)

    return (
        <>
            <Header useCase="protected"/>
            <Link to={'/dashboard'}>
                <FontAwesomeIcon 
                    icon={faArrowLeftLong} 
                    className="text-main-color-lightgrey mr-auto mt-12 text-4xl pl-1 cursor-pointer hover:text-accent-color-darkyellow"
                />
            </Link>
            <div className="profile-upper-container mb-16">
                <img src={require('../assets/couple-love.png')} className="w-36 rounded-full border"/>
                <h4 className="mt-8 mb-3 font-semibold text-3xl">Mark Plum</h4>
                <p className="text-sm">Joined January 15, 2024</p>
            </div>  
            {/* <div className="mt-10 md:w-8/12 ml-auto mr-auto">
                <form className="flex flex-col justify-center" action="#" method="POST">
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-10 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='partner' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Partner:
                        </label>
                        <input
                            id='partner'
                            name='partner'
                            type='text'
                            className={`bg-main-color-lightgrey border-none w-full ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-10 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='location' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Location:
                        </label>
                        <input
                            id='location'
                            name='location'
                            type='text'
                            className={`bg-main-color-lightgrey w-full border-none ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-14 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='interests' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Interests:
                        </label>
                        <input
                            id='interests'
                            name='interests'
                            type='text'
                            className={`bg-main-color-lightgrey w-full border-none ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    {!open? (
                        <button 
                            className="profile-btn"
                            onClick={(event) => {event.preventDefault(); setOpen(!open);}}
                        >
                            Edit
                        </button>
                    ):(
                        <button 
                            className="profile-btn"
                            onClick={(event) => {event.preventDefault(); setOpen(!open);}}
                            type="submit"
                        >
                            Save
                        </button>
                    )}
                </form>
            </div> */}
            <div className="profile-section-link">
                <FontAwesomeIcon icon={faUser} />
                <p className="ml-5">Personal Information</p>
            </div>
            <Link to={"/preferences"}>
                <div className="profile-section-link">
                    <FontAwesomeIcon icon={faWrench} />
                    <p className="ml-5">Profile Preferences</p>
                </div>
            </Link>
        </>
    )
}