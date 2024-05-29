import React from "react"
import Header from "../../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign, faThumbTack } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export default function DateList(){
    function retrieveDateList(){
        //logic with database will go here
    }

    return (
        <>
            <Header useCase="protected" />
            <h3 className="page-title">Saved Date Ideas</h3>
            <div className="list-container">
                <Link to={'/<id>'}>
                    <div className="date-list-option"> 
                        <h4 className="max-w-24 md:max-w-56 lg:max-w-72 overflow-clip text-nowrap text-ellipsis">
                            Tacos at Gustos
                        </h4>
                        <div className="h-6 w-1 bg-accent-color-black rounded-3xl mx-1.5"></div>
                        <div className="flex justify-center items-center">
                            <FontAwesomeIcon icon={faThumbTack} className="text-main-color-green mx-1.5" />
                            <p className="mx-1.5">
                                Toronto
                            </p>
                        </div>
                        <div className="h-6 w-1 bg-accent-color-black rounded-3xl mx-1.5"></div>
                        <div className="flex justify-center items-center">
                            <FontAwesomeIcon icon={faDollarSign} className="text-main-color-green mx-0.5"/>
                            <FontAwesomeIcon icon={faDollarSign} className="text-main-color-green mx-0.5"/>
                            <FontAwesomeIcon icon={faDollarSign} className="text-main-color-green mx-0.5"/>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}