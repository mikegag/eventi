import React from "react"
import { IconDefinition, faLightbulb, faCompass, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import data from "../Data.json"

interface CardProps {
    useCase: string,
    graphData: string,
    getComponent: (variable:string) => void
    isSelected: boolean
}

const iconMap: Record<string, IconDefinition> = {
    faLightbulb,
    faCompass,
    faCalendar
}

export default function SmallButtonCard({useCase, graphData, getComponent, isSelected}:CardProps){
    function handleClick(componentID:string){
        getComponent(componentID)
    }

    function getUseCaseInformation(givenCase:string){
        const formattedUseCase = givenCase.replace(/\s+/g, '').toLowerCase()
        if (formattedUseCase === 'total') {
            return data.dashboardData.visuals.totalIdeas
        } else if (formattedUseCase === 'location') {
            return data.dashboardData.visuals.location
        } else if (formattedUseCase === 'time') {
            return data.dashboardData.visuals.time
        }
        return data.dashboardData.visuals.totalIdeas
    }

    const cardData = getUseCaseInformation(useCase)

    return (
        <div 
            className={`smallBtnCard ${isSelected? "bg-main-color-yellow": "bg-main-color-lightgrey"}`} 
            id={cardData.id} 
            onClick={()=>handleClick(cardData.id)} 
            role="button"
        >
            <p className="text-sm my-2">
                <FontAwesomeIcon icon={iconMap[cardData.icon]} className="mr-2 text-lg"/> 
                {cardData.title}
            </p>
            <h3 className="text-lg">{graphData}</h3>
        </div> 
    )
}