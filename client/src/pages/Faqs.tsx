import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FaqCard from "../components/FaqCard"

export default function Faqs(){
    return (
        <>
            <Header useCase="default"/>
            <h3 className="page-title mb-16">Commonly Asked Questions</h3>
            <FaqCard question="ma wife?" answer="yaes"/>
            <FaqCard question="ma wife?" answer="yaeswwwwwwwwwwwwwwwwwwwwwwwwww"/>
            <FaqCard question="ma wife?" answer="yaeswwwwwwwwwwwwwwwwwwwwwwwwww"/>
            <Footer />
        </>
    )
}