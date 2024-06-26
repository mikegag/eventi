import React from "react"
import { IconDefinition, faArrowLeftLong, faClipboardList, faMagnifyingGlassPlus, faMartiniGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { useHover } from "@uidotdev/usehooks"
import data from "../Data.json"

interface CardProps {
    useCase: string
}

const iconMap: Record<string, IconDefinition> = {
    faClipboardList,
    faMagnifyingGlassPlus,
    faMartiniGlass
}

export default function LargeButtonCard({useCase}:CardProps){
    const [cardRef, cardHovering] = useHover()

    function getUseCaseInformation(givenCase:string){
        const formattedUseCase = givenCase.replace(/\s+/g, '').toLowerCase()
        if (formattedUseCase === 'generate') {
            return data.dashboardData.generate
        } else if (formattedUseCase === 'add') {
            return data.dashboardData.add
        } else if (formattedUseCase === 'list') {
            return data.dashboardData.list
        }
        return data.dashboardData.list
    }

    const cardData = getUseCaseInformation(useCase)

    return (
            <Link to={`${cardData?.route}`}>
                <div className="card w-72 my-4" ref={cardRef}>
                    <p className="mr-5"> {cardData?.title} </p>
                    {cardHovering ? (
                        <FontAwesomeIcon 
                            icon={faArrowLeftLong} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', transform: 'rotate(180deg)', opacity: '100' }} 
                        />
                    ) : (
                        <FontAwesomeIcon 
                            icon={iconMap[cardData.icon]}
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', opacity: '1' }} 
                        />
                    )}
                </div>
            </Link>  
    )
}