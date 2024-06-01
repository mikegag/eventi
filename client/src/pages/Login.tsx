import React, { useEffect } from "react"
import { useNavigate} from "react-router-dom"
import Header from "../components/Header"
import Form from "../components/Form"

export default function Login(){
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Eventi - Login"
    }, [])
    
    function handleSubmit (formData: { [key: string]: string }):void {
        console.log('Form data submitted:', formData);
        navigate("/dashboard")
        // Handle form data submission logic here
    }
    return (
        <>
            <Header useCase="default"/>
            <Form 
                useCase="login"
                onSubmit={handleSubmit}
            />
        </>
    )
}