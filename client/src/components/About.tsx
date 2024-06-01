import React from "react"
import data from "../Data.json"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About(){
    const { ref, inView } = useInView({
        threshold: 0.6 
    })

    return (
        <>
            <div className="about-top-line" role="presentation"></div>
            <div className="flex flex-col lg:flex-row">
                <div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: "-20%" }}
                    animate={{ opacity:inView ? 1 : 0, x:inView ? 0 : "-20%" , transition: { duration: 1.1 } }}
                >
                    <h3 className="page-title mt-0 no-underline px-4 lg:text-left lg:px-0">
                        {data.aboutSection.description.heading}
                    </h3>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: "20%" }}
                    animate={{ opacity:inView ? 1 : 0, x:inView ? 0 : "20%" , transition: { duration: 1.1 } }}
                >
                    <ul className="mx-auto lg:mr-28 lg:pt-4">
                        {data.aboutSection.description.points.map((curr, index)=>(
                            <li 
                                key={index} 
                                className="about-bullet-point">
                                    {curr}
                            </li>
                        ))}
                    </ul>
                </motion.div>
                </div>
                    <img 
                        src={require("../assets/couple-love.png")} 
                        className="w-60 mt-8 mb-14 mx-auto lg:w-72 lg:ml-8 lg:mt-14"
                    />
            </div>
        </>
    )
}