import { faArrowLeftLong, faClipboardList, faMagnifyingGlassPlus, faMartiniGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import { useHover } from "@uidotdev/usehooks"

export default function DashboardCard(){
    const [generateIdeaRef, generateIdeaHovering] = useHover()
    const [addDateRef, addDateHovering] = useHover()
    const [viewListRef, viewListHovering] = useHover()
    return (
        <div className="flex flex-col justify-center items-end bg-accent-color-darkgreen p-4 rounded-xl">
            <Link to={'/generate-idea'}>
                <div className="card w-80 my-2" ref={generateIdeaRef}>
                    <p className="mr-5"> Generate Idea </p>
                    {generateIdeaHovering ? (
                        <FontAwesomeIcon 
                            icon={faArrowLeftLong} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', transform: 'rotate(180deg)', opacity: '100' }} 
                        />
                    ) : (
                        <FontAwesomeIcon 
                            icon={faMartiniGlass} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', opacity: '1' }} 
                        />
                    )}
                </div>
            </Link>
            <Link to={'/add-idea'} >
                <div className="card w-80 my-2" ref={addDateRef}>
                    <p className="mr-5"> Add Date Idea </p> 
                    {addDateHovering ? (
                        <FontAwesomeIcon 
                            icon={faArrowLeftLong} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', transform: 'rotate(180deg)', opacity: '100' }} 
                        />
                    ) : (
                        <FontAwesomeIcon 
                            icon={faMagnifyingGlassPlus} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', opacity: '1' }} 
                        />
                    )}
                </div>
            </Link>
            <Link to={'/date-list'}>
                <div className="card w-80 my-2" ref={viewListRef}>
                    <p className="mr-5"> View Date List </p>
                    {viewListHovering ? (
                        <FontAwesomeIcon 
                            icon={faArrowLeftLong} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', transform: 'rotate(180deg)', opacity: '100' }} 
                        />
                    ) : (
                        <FontAwesomeIcon 
                            icon={faClipboardList} 
                            style={{ transition: 'transform 0.4s ease, opacity 0.4s ease', opacity: '1' }} 
                        />
                    )}
                </div>
            </Link>
        </div>
    )
}