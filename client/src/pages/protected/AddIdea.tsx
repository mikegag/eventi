import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import Form from "../../components/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faCircleCheck, faLongArrowLeft } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

export default function AddIdea(){
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

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

    function getCurrentDate(){
        const date = new Date()
        return date.toISOString()
    }

    useEffect(() => {
        document.title = "Add A Date Idea"
    }, [])

    function handleSubmit (event: React.FormEvent, formData: { [key: string]: string | boolean }):void {
        formData = {...formData,'date_created': getCurrentDate(),'completed':false}
        console.log('Form data submitted:', formData);
        setIsSubmitted(true)
        
        const csrftoken = getCookie('csrftoken')
        axios.post('/api/dashboard/add-idea/', formData, {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })
    }
    return (
        <>
            <Header useCase="protected" />
            <Link to={'../'}>
                <FontAwesomeIcon 
                    icon={faArrowLeftLong} 
                    className="back-arrow"
                />
            </Link>
            {isSubmitted ? 
            (   <div className="flex flex-col justify-center">
                    <h3 className="page-title mt-6 lg:mt-2">Idea Successfully Saved!</h3>
                    <FontAwesomeIcon icon={faCircleCheck} className="mx-auto text-7xl mt-8 mb-16 text-main-color-yellow" />
                    <Link to={'/dashboard/add-idea'} reloadDocument className="page-link">
                        <FontAwesomeIcon icon={faLongArrowLeft} />
                        <p className="underline ml-3">Add Another Date Idea</p>
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