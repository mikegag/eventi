import React, { useState } from "react"
import Header from "../../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faArrowLeftLong, faSignature } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function PersonalInformation(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    //form logic goes here

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
                    Full Name
                </label>
                <input
                    name="name"
                    type="text"
                    disabled 
                    className="form-input-alternative mb-5"
                />
                <label htmlFor="username" className="form-label">
                    <FontAwesomeIcon icon={faSignature} className="mr-3"/>
                    Username
                </label>
                <input
                    name="username"
                    type="text"
                    disabled 
                    className="form-input-alternative mb-5"
                />
                <label htmlFor="email" className="form-label">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-3"/>
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    disabled
                    className="form-input-alternative"
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
                        onClick={() => setIsOpen(!isOpen)} 
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