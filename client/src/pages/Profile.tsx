import React from "react"
import Header from "../components/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function Profile(){
    const [open,setOpen] = useState(false)

    return (
        <>
            <Header useCase="protected"/>
            <FontAwesomeIcon icon={faArrowLeftLong} className="text-main-color-lightgrey mr-auto mt-12 text-4xl pl-1 cursor-pointer hover:text-accent-color-darkyellow"/>
            <div className="flex flex-col justify-center items-center md:w-8/12 ml-auto mr-auto border-b-2 border-main-color-yellow text-main-color-lightgrey">
                <img src={require('../assets/couple-love.png')} className="w-36 rounded-full border"/>
                <h4 className="mt-8 mb-4 font-semibold text-2xl">Mark Plum</h4>
                <p>mp4450</p>
                <p className="mt-4 mb-6">markplum@gmail.com</p>
            </div>  
            <div className="mt-10 md:w-8/12 ml-auto mr-auto">
                <form className="flex flex-col justify-center" action="#" method="POST">
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-10 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='partner' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Partner:
                        </label>
                        <input
                            id='partner'
                            name='partner'
                            type='text'
                            className={`bg-main-color-lightgrey border-none w-full ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-10 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='location' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Location:
                        </label>
                        <input
                            id='location'
                            name='location'
                            type='text'
                            className={`bg-main-color-lightgrey w-full border-none ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    <div className={`flex bg-main-color-lightgrey rounded-xl py-2 px-4 mb-14 ${open? 'bg-accent-color-white':''}`}>
                        <label htmlFor='interests' className="form-label text-main-color-green font-medium mt-auto mb-auto mr-3">
                            Interests:
                        </label>
                        <input
                            id='interests'
                            name='interests'
                            type='text'
                            className={`bg-main-color-lightgrey w-full border-none ${open? 'bg-accent-color-white':''}`}
                            {...(!open ? { disabled: true } : {disabled: false})}
                        /> 
                    </div>
                    {!open? (
                    <button 
                        className="ml-auto mr-auto bg-main-color-yellow text-accent-color-black font-medium cursor-pointer border-accent-color-black rounded-lg px-6 py-2 hover:bg-accent-color-darkyellow"
                        onClick={(event) => {event.preventDefault(); setOpen(!open);}}
                    >
                        Edit
                    </button>
                    ):(
                    <button 
                        className="ml-auto mr-auto bg-main-color-yellow text-accent-color-black font-medium cursor-pointer border-accent-color-black rounded-lg px-6 py-2 hover:bg-accent-color-darkyellow"
                        onClick={(event) => {event.preventDefault(); setOpen(!open);}}
                        type="submit"
                    >
                        Save
                    </button>
                    )}
                </form>
            </div>
        </>
    )
}