import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Form from "../components/Form"

export default function Login(){
    return (
        <>
            <Header useCase="default"/>
            <Form useCase="login"/>
            <Footer />
        </>
    )
}