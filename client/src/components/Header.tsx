import React from "react"

export default function Header(){
    return (
        <div className="header-container">
            <img 
                src={require("../assets/eventi-logo-small.png")} 
                className="w-24 mt-auto mb-auto ml-0 mr-auto cursor-pointer"
            />
            <button className="header-btn mt-auto mb-auto ml-auto mr-0"> Login</button>
        </div>
    )
}