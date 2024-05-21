import React, {useState} from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Form from "../components/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faLongArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function AddIdea(){
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    function handleSubmit (formData: { [key: string]: string }):void {
        console.log('Form data submitted:', formData);
        setIsSubmitted(true)
        // Handle form data submission logic here
    }
    return (
        <>
            <Header useCase="protected" />
            {!isSubmitted ? 
            (   <div className="flex flex-col justify-center">
                    <h3 className="page-title">Idea Successfully Saved!</h3>
                    <FontAwesomeIcon icon={faCircleCheck} className="mx-auto text-7xl mt-8 mb-16 text-main-color-yellow" />
                    <Link to={'/date-list'} className="page-link">
                        <FontAwesomeIcon icon={faLongArrowLeft} />
                        <p className="underline ml-3">View Date List</p>
                    </Link>
                    <Link to={'/dashboard'} className="page-link">
                        <FontAwesomeIcon icon={faLongArrowLeft} />
                        <p className="underline ml-3">Back to Dashboard</p>
                    </Link>
                </div>
            ) 
            : 
            (
                <Form 
                    useCase="date" 
                    onSubmit={handleSubmit}
                />
            )} 
        </>
    )
}