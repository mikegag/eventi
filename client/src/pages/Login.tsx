import React, { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import Header from "../components/Header"
import Form from "../components/Form"
import axios from 'axios'

export default function Login(){
    const navigate = useNavigate()
    const [csrfToken, setCsrfToken] = useState<string | null>(null)
    
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
        document.title = "Eventi - Login"
        let csrftoken = getCookie('csrftoken')
        if (!csrftoken) {
            axios.get('/api/csrf_token/')
                .then(res => {
                    if (res.data.csrfToken) {
                        csrftoken = res.data.csrfToken
                        document.cookie = `csrftoken=${csrftoken}; path=/`
                        setCsrfToken(csrftoken)
                    }
                })
                .catch(error => {
                    console.error('Error fetching CSRF token:', error)
                })
        } else {
            setCsrfToken(csrftoken)
        }
    }, [])
    
    function handleSubmit(event: React.FormEvent, formData: { [key: string]: string }): void {
        event.preventDefault()
        const csrftoken = getCookie('csrftoken')
        console.log(csrftoken)
        axios.post('/api/login/', formData,{
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const userData = res.data
                    setTimeout(() => {
                        navigate("/dashboard")
                        console.log("login successful")
                    }, 600)
                } else {
                    console.error("Login failed")
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
                useCase="login"
                onSubmit={handleSubmit}
            />
        </>
    )
}