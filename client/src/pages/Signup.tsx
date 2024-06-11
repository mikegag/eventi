import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Form from "../components/Form"
import axios from "axios"

export default function SignUp(){
    const navigate = useNavigate()

    function getCookie(name:string) {
        let cookieValue = null
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
        document.title = "Eventi - Sign Up"
    }, []) 
    
    function handleSubmit (event: React.FormEvent, formData: { [key: string]: string }):void {
        event.preventDefault()
        const csrftoken = getCookie('csrftoken')
        axios.post('/api/signup/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
            .then(res => {
                if (res.status === 201) {
                    const userData = res.data
                    setTimeout(() => {
                        navigate("/dashboard")
                    }, 600)
                } else {
                    console.error("signup failed")
                }
            })
            .catch(error => {
                if (error.response) {
                    // the server responded with a status code that falls out of the range of 2xx
                    console.error('Error response:', error.response.data)
                    console.error('Status:', error.response.status)
                    console.error('Headers:', error.response.headers)
                } else if (error.request) {
                    // no response was received
                    console.error('No response received:', error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request:', error.message)
                }
                console.error('Error config:', error.config)
            })
    }
    return (
        <>
            <Header useCase="default"/>
            <Form 
                useCase="signup"
                onSubmit={handleSubmit}
            />
        </>
    )
}