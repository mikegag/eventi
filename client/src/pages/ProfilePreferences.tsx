import React from "react"
import Header from "../components/Header"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export default function ProfilePreferences(){
    //form logic goes here

    return (
        <>
            <Header useCase="protected"/>
            <h3 className="page-title"> Preferences</h3>
            <form className="flex flex-col md:w-3/5 mx-auto">
                <label 
                    htmlFor="partner"
                    className="form-label"
                >
                    Date Partner
                </label>
                <input
                    name="partner"
                    type="text"
                    className="form-input mb-5"
                />
                <label 
                    htmlFor="location"
                    className="form-label"
                >
                    Location (City or Area)
                </label>
                <input
                    name="location"
                    type="text"
                    className="form-input mb-5"
                />
                <label 
                    htmlFor="interests"
                    className="form-label"
                >
                    Interests (comma separated)
                </label>
                <input
                    name="interests"
                    type="text"
                    className="form-input"
                />
                <button type="submit" className="form-submit-btn w-fit mx-auto">
                    edit
                </button>
            </form>
            
        </>
    )
}