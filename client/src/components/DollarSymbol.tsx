import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface UseCaseProps {
    useCase: string
}
export default function DollarSymbol({useCase}:UseCaseProps){

    /* determines how many dollar signs to return based on given budget
     1 dollar sign === $0-$20, 1 dollar sign === $40-$80, 3 dollar signs === $80+ */
    function determineUseCase(givenUseCase:string):number{
        if(givenUseCase.toLocaleLowerCase().includes("20")){
            return 1

        } else if(givenUseCase.toLocaleLowerCase().includes("40")){
            return 2

        } else if(givenUseCase.toLocaleLowerCase().includes("more")){
            return 3
        } 
        return 1
    }
    const output = determineUseCase(useCase)
    // Generate an array of length equal to output, filled with undefined values
    const dollarSigns = Array.from({ length: output }, (_, index) => (
        <FontAwesomeIcon key={index} icon={faDollarSign} className="text-main-color-green mx-0.5" />
    ))

    return (
        <div className="flex justify-center items-center">
            {dollarSigns}
        </div>
    )
}