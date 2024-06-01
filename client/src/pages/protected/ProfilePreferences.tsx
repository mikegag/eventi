import React, { useState } from "react"
import Header from "../../components/Header"
import { faChampagneGlasses, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"

export default function ProfilePreferences(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    //form logic goes here

    return (
        <>
            <Header useCase="protected"/>
            <h3 className="page-title"> Preferences</h3>
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