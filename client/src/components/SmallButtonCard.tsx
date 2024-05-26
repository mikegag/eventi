import React, {useState} from "react"
import { IconDefinition, faLightbulb, faCompass, faCalendar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import data from "../Data.json"

interface CardProps {
    useCase: string,
    graphData: string,
    readyToDisplay: (variable:boolean) => void
}

const iconMap: Record<string, IconDefinition> = {
    faLightbulb,
    faCompass,
    faCalendar
}

export default function SmallButtonCard({useCase, graphData, readyToDisplay}:CardProps){
    const [isClicked, setIsClicked] = useState<boolean>(false)

    function handleClick(){
        const prev = !isClicked
        setIsClicked(prev)
        readyToDisplay(prev)
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
        <div className="flex flex-col justify-start bg-main-color-lightgrey px-8 py-2 rounded-xl mr-7" onClick={handleClick} role="button">
            <p className="text-sm my-2">
                <FontAwesomeIcon icon={iconMap[cardData.icon]} className="mr-2 text-lg"/> 
                {cardData.title}
            </p>
            <h3 className="text-lg">{graphData}</h3>
        </div> 
    )
}