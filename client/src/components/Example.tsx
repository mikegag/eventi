import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import data from "../Data.json"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Example(){
    return (
        <div className="flex flex-col lg:flex-row bg-main-color-lightgrey rounded-2xl border-2 border-accent-color-black px-3 py-4 lg:px-5 lg:py-8 mx-auto lg:mx-20">
            <img 
                src={require("../assets/graph-example.png")} 
                className=" w-72 lg:w-80 rounded-2xl mx-auto lg:mx-5 lg:my-auto"
            />
            <div className="flex flex-col items-center lg:items-start lg:pl-20 lg:pr-4">
                <h3 className="page-title no-underline text-accent-color-black mt-12 lg:mt-0 lg:px-0 mb-7">{data.graphExample.heading}</h3>
                <p className=" text-xl text-center lg:text-left lg:text-2xl font-medium mb-10 lg:mb-10">{data.graphExample.body}</p>
                <Link to={'/d'}>
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.9 }}
                        className="header-btn bg-main-color-yellow text-xl px-7 py-2 hover:bg-accent-color-darkyellow shadow-sm"
                    >
                        Explore
                        <FontAwesomeIcon icon={faArrowRightLong} className="ml-5 my-auto"/> 
                    </motion.button>
                </Link>
            </div>
        </div>
    )
}