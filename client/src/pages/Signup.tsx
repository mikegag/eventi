import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Form from "../components/Form"

export default function SignUp(){
    function handleSubmit (formData: { [key: string]: string }):void {
        console.log('Form data submitted:', formData);
        // Handle form data submission logic here
    }
    return (
        <>
            <Header useCase="default"/>
            <Form 
                useCase="signup"
                onSubmit={handleSubmit}
            />
            <Footer />
        </>
    )
}