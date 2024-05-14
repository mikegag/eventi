import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Form from "../components/Form"

export default function SignUp(){
    return (
        <>
            <Header useCase="default"/>
            <Form useCase="signup"/>
            <Footer />
        </>
    )
}