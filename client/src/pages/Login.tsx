import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Form from "../components/Form"

export default function Login(){
    return (
        <>
            <Header />
            <Form useCase="login"/>
            <Footer />
        </>
    )
}