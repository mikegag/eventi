import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function Error(){
    return (
        <div className="mt-48 mr-auto ml-auto text-center font-medium">
            <h4 className="text-accent-color-white text-2xl mb-14">Oops! Looks like something went wrong.</h4>
            <Link 
                to={"/"} 
                className="flex justify-center text-accent-color-white underline text-lg w-fit m-auto hover:text-accent-color-darkyellow"> 
                    <FontAwesomeIcon icon={faArrowLeft} className="mt-auto mb-auto" />
                    <p className="ml-4"> Back to Home Page </p>
            </Link>
        </div>
    )
}