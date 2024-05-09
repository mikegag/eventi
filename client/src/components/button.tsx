import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    textValue: string
}

export default function HeaderButton({textValue}:ButtonProps) {
    function styling(): string {
        if(textValue === "login"){
            return "default"
        }
        else if(textValue === "profile"){
            return "first"
        }
        else if(textValue === "logout"){
            return "default"
        }
        return "default"
    }
    return (
        <button className={styling()}> test </button>
    )
}
