import React from "react"
import Header from "../components/Header"
import Form from "../components/Form"

export default function AddIdea(){
    function handleSubmit (formData: { [key: string]: string }):void {
        console.log('Form data submitted:', formData);
        // Handle form data submission logic here
    }
    return (
        <>
            <Header useCase="protected" />
            <Form 
                useCase="date" 
                onSubmit={handleSubmit}
            />
        </>
    )
}