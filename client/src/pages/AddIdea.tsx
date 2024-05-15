import React from "react"
import Header from "../components/Header"
import Form from "../components/Form"

export default function AddIdea(){
    return (
        <>
            <Header useCase="protected" />
            <Form useCase="date" />
        </>
    )
}