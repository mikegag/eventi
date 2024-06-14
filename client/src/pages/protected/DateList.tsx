import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import DollarSymbol from "../../components/DollarSymbol"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faDollarSign, faThumbTack } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import axios from "axios"

interface DateListDataProps {
    id: string,
    title:string,
    location: string,
    budget: string,
    date_created: string,
    completed: boolean
}
export default function DateList(){
    const [dateListData, setDateListData] = useState<DateListDataProps>({ 
        id: '',
        title:'',
        location: '',
        budget: '',
        date_created: '',
        completed: false
    })

    //gets csfr authentication cookie
    function getCookie(name:string) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';')
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim()
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                    break
                }
            }
        }
        return cookieValue
    }

    useEffect(() => {
        document.title = "Saved Date Ideas"
        const csrftoken = getCookie('csrftoken')
        axios.get('/api/dashboard/date-list/', {
            headers: {
                'X-CSRFToken': csrftoken,
            }
        })
        .then(res => {
            setDateListData(res.data)
            console.log(res)
        })
        .catch(err => {
            console.error("Error fetching profile data:", err)
        })
    }, [])


    return (
        <>
            <Header useCase="protected" />
            <Link to={'/dashboard'}>
                <FontAwesomeIcon 
                    icon={faArrowLeftLong} 
                    className="back-arrow"
                />
            </Link>
            <h3 className="page-title mt-6 lg:mt-2">Saved Date Ideas</h3>
            <div className="list-container">
                <Link to={':id'}>
                    <div className="date-list-option"> 
                        <h4 className="max-w-24 md:max-w-56 lg:max-w-72 overflow-clip text-nowrap text-ellipsis">
                            {dateListData.title}
                        </h4>
                        <div className="h-6 w-1 bg-accent-color-black rounded-3xl mx-1.5"></div>
                        <div className="flex justify-center items-center">
                            <FontAwesomeIcon icon={faThumbTack} className="text-main-color-green mx-1.5" />
                            <p className="mx-1.5">
                                {dateListData.location}
                            </p>
                        </div>
                        <div className="h-6 w-1 bg-accent-color-black rounded-3xl mx-1.5"></div>
                        <DollarSymbol useCase={dateListData.budget? dateListData.budget : ""} />
                    </div>
                </Link>
            </div>
        </>
    )
}