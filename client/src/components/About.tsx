import React, { useEffect, useState } from "react"
import data from "../Data.json"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About(){
    const [isVisible, setIsVisible] = useState(false);
    const { ref, inView } = useInView({
        threshold: 0.6
        
    })

    useEffect(() => {
        if (inView) {
            setIsVisible(true)
        }
    }, [inView])

    return (
        <>
            <div className="h-2 bg-main-color-lightgrey rounded-full px-4 lg:w-5/12 lg:mx-auto mb-32"></div>
            <div className="flex flex-col lg:flex-row">
                <div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: "-20%" }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : "-20%" , transition: { duration: 1.1 } }}
                >
                    <h3 className="page-title mt-0 no-underline px-4 lg:text-left lg:px-0">{data.aboutSection.description.heading}</h3>
                </motion.div>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: "20%" }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : "20%" , transition: { duration: 1.1 } }}
                >
                    <ul className="mx-auto lg:mr-28 lg:pt-4">
                        {data.aboutSection.description.points.map((curr, index)=>(
                            <li key={index} className="list-disc text-lg text-main-color-lightgrey mb-5 text-center lg:text-left lg:text-2xl lg:mb-8">{curr}</li>
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