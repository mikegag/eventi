import React from "react"
import data from "../Data.json"
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Example(){
    const { ref, inView } = useInView({
        threshold: 0.6,
    })

    return (
        <div className="example-container">
            <img 
                src={require("../assets/graph-example.png")} 
                className=" w-72 lg:w-80 rounded-2xl mx-auto lg:mx-5 lg:my-auto"
                alt="graph showing the number of dates occurring over the last 4 weeks"
            />
            <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: "-10%" }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : "-10%" , transition: { duration: 1.1 } }}
            >
                <div className="flex flex-col items-center lg:items-start lg:pl-20 lg:pr-4">
                    <h3 className="page-title no-underline text-accent-color-black mt-12 lg:mt-0 lg:px-0 mb-7">
                        {data.graphExample.heading}
                    </h3>
                    <p className=" text-xl text-center lg:text-left lg:text-2xl font-medium mb-10 lg:mb-10">
                        {data.graphExample.body}
                    </p>
                    <Link to={'/signup'}>
                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.9 }}
                            className="header-btn bg-main-color-yellow text-xl px-7 py-2 hover:bg-accent-color-darkyellow shadow-sm"
                            aria-label="redirects user to sign up page"
                        >
                            Explore
                            <FontAwesomeIcon icon={faArrowRightLong} className="ml-5 my-auto"/> 
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}