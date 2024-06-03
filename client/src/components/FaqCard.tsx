import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import React from "react"

interface FaqCardProps {
    question: string;
    answer: string;
}

export default function Question({ question, answer }: FaqCardProps){
    const [isOpen, setIsOpen] = useState(false)
    const [answerHeight, setAnswerHeight] = useState<number | undefined>(undefined)
    const answerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setAnswerHeight(isOpen ? answerRef.current?.scrollHeight : 0);
    }, [isOpen])

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="rounded-lg shadow-md mb-10 md:max-w-lg lg:max-w-3xl mx-auto">
            <button
                onClick={toggleAccordion}
                className={`flex justify-between items-center w-full p-4 bg-main-color-lightgrey rounded-lg ${isOpen? 'rounded-b-none':''}`}
            >
                <p className="text-lg font-semibold text-left text-accent-color-black">{question}</p>
                <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-height duration-300 rounded-lg ${isOpen? 'rounded-t-none':''}`}
                style={{ height: isOpen ? answerHeight : 0 }}
            >
                <div ref={answerRef} className={`p-4 bg-main-color-lightgrey ${isOpen ? 'block' : 'hidden'}`}>
                    <p className="text-accent-color-black">{answer}</p>
                </div>
            </div>
        </div>
    )
}