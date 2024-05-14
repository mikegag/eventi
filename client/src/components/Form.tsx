import { IconDefinition, faEnvelope, faUser} from "@fortawesome/free-regular-svg-icons"
import { faCreditCard, faFilePen, faLocationDot, faLock  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"

interface FormProps {
        useCase: string
}

interface FormData {
    title: string;
    ids: string[];
    labels: string[];
    types: string[];
    placeholders: string[];
    icons: IconDefinition[];
    selectOptions?: string[];
    button: string;
}

export default function Form({useCase}:FormProps){
    const formData = {
        login:{
            title:"Hello Again!",
            ids:['email','password'],
            labels:['Email','Password'],
            types:['email','password'],
            placeholders:['Enter your email','Enter your password'],
            icons:[faEnvelope,faLock],
            button:"Login"
        },
        signup:{
            title:"Let's Get Started",
            ids:['username','email','password'],
            labels:['Username','Email','Password'],
            types:['text','email','password'],
            placeholders:['Enter your username','Enter your email','Enter your password'],
            icons:[faUser,faEnvelope,faLock],
            button:"Sign Up"
        },
        date:{
            title:"Add Your Date Details",
            ids:['location','budget','description'],
            labels:['Location (City, Country)',"What's your budget?",'What will you do on the date?'],
            types:['text','select','textarea'],
            placeholders:['Enter your date location (City, Country)','','Enter your date description'],
            icons:[faLocationDot,faCreditCard,faFilePen],
            selectOptions:['Select your budget','$0-$20','$40-$80','$80 or more'],
            button:"Save"
        }
    }

    function determineUseCase(useCase:string):object{
        const formattedUseCase = useCase.replace(/\s+/g, '').toLowerCase()
        console.log(formattedUseCase)
        if(formattedUseCase === 'signup'){
            return formData.signup
        }
        else if(formattedUseCase === 'date'){
            return formData.date
        }
        return formData.login
    }

    const formOutput = determineUseCase(useCase) as FormData

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-lg">
            <h3 className="page-title">{formOutput.title}</h3>
            <form className="space-y-6" action="#" method="POST">
                {formOutput.ids.map((id, index) => (
                    <div key={id}>
                        <label htmlFor={id} className="form-label">
                            <FontAwesomeIcon icon={formOutput.icons[index]} className="mr-3 text-base" />
                            {formOutput.labels[index]}
                        </label>
                        <div className="mt-2">
                            {formOutput.types?.[index] === 'text' || formOutput.types?.[index] === 'email' || formOutput.types?.[index] === 'password' ?
                                <input
                                    id={formOutput.ids[index]}
                                    name={formOutput.ids[index]}
                                    type={formOutput.types[index]}
                                    required
                                    placeholder={formOutput.placeholders[index] as 'text' | 'email' | 'password'}
                                    className="form-input"
                                /> 
                            : 
                                formOutput.types?.[index] === 'select' ?
                                    <select
                                        id={formOutput.ids[index]}
                                        name={formOutput.ids[index]}
                                        required
                                        className="form-input"
                                    >
                                        {formOutput.selectOptions?.map((option, optionIndex) => (
                                            optionIndex === 0? 
                                            (<option key={optionIndex} disabled selected value={option}>{option} </option>) 
                                            :
                                            (<option key={optionIndex} value={option}>{option}</option>) 
                                        ))}
                                    </select>
                                :
                                    <textarea
                                        id={formOutput.ids[index]}
                                        name={formOutput.ids[index]}
                                        required
                                        placeholder={formOutput.placeholders[index]}
                                        className="form-input max-h-32 min-h-32"
                                    />
                            }
                        </div>
                    </div>
                ))}
            </form>

            <div>
                <button type="submit" className="form-submit-btn">
                    {formOutput.button}
                </button>
            </div>

            {formOutput.button === 'Login' ? (
                <>
                    <p className="mt-10 font-semibold text-center text-base text-main-color-lightgrey flex justify-center">
                        Don't have an account?{' '}
                        <Link to={'/signup'}>
                            <p className="leading-6 hover:text-accent-color-darkyellow underline ml-2">
                                Sign Up
                            </p>
                        </Link>
                    </p>
                </>
            ) 
            : 
                (formOutput.button === 'Sign Up' ? (
                    <>
                        <p className="mt-10 font-semibold text-center text-base text-main-color-lightgrey flex justify-center">
                            Already have an account?{' '}
                            <Link to={'/login'}>
                                <p className="leading-6 hover:text-accent-color-darkyellow underline ml-2">
                                    Login
                                </p>
                            </Link>
                        </p>
                    </>
                )
                :
                <></>
            )}
        </div>
                
)}