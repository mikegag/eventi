import React from "react"
import FaqCard from "./FaqCard"
import data from "../Data.json"

export default function Faqs(){
    return (
        <div>
            <h3 className="page-title mb-16">Commonly Asked Questions</h3>
            {data.faqs.questions.map((curr,index)=>(
                <FaqCard key={index} question={curr} answer={data.faqs.answers[index]}/>
            ))}
        </div>
    )
}