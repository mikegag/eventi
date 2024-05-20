import React from 'react'
import { IconDefinition, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCreditCard, faFilePen, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import formData from '../Data.json'

interface FormProps {
  useCase: string
}
//properties of the form
interface FormConfig {
  title: string,
  ids: string[],
  labels: string[],
  types: string[],
  placeholders: string[],
  icons: string[],
  button: string,
  selectOptions?: string[],
}

const iconMap: Record<string, IconDefinition> = {
  faEnvelope,
  faUser,
  faCreditCard,
  faFilePen,
  faLocationDot,
  faLock,
}


export default function Form({ useCase }: FormProps) {
  //determines which type of form and inputs to use
  function determineUseCase(useCase: string): FormConfig {
    const formattedUseCase = useCase.replace(/\s+/g, '').toLowerCase()
    if (formattedUseCase === 'signup') {
      return formData.formData.signup
    } else if (formattedUseCase === 'date') {
      return formData.formData.date
    }
    return formData.formData.login
  }
  //represents the desired form based on passed prop
  const formOutput = determineUseCase(useCase)

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-lg">
      <h3 className="page-title">{formOutput.title}</h3>
      <form className="space-y-6" action="#" method="POST">
        {formOutput.ids.map((id, index) => (
          <div key={id}>
            <label htmlFor={id} className="form-label">
              <FontAwesomeIcon icon={iconMap[formOutput.icons[index]]} className="mr-3 text-base" />
              {formOutput.labels[index]}
            </label>
            <div className="mt-2">
              {formOutput.types[index] === 'text' ||
              formOutput.types[index] === 'email' ||
              formOutput.types[index] === 'password' ? (
                <input
                  id={formOutput.ids[index]}
                  name={formOutput.ids[index]}
                  type={formOutput.types[index]}
                  required
                  placeholder={formOutput.placeholders[index]}
                  className="form-input"
                />
              ) : formOutput.types[index] === 'select' ? (
                <select id={formOutput.ids[index]} name={formOutput.ids[index]} required className="form-input">
                  {formOutput.selectOptions?.map((option, optionIndex) =>
                    optionIndex === 0 ? (
                      <option key={optionIndex} disabled selected value="">
                        {option}
                      </option>
                    ) : (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <textarea
                  id={formOutput.ids[index]}
                  name={formOutput.ids[index]}
                  required
                  placeholder={formOutput.placeholders[index]}
                  className="form-input max-h-32 min-h-32"
                />
              )}
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
              <p className="leading-6 hover:text-accent-color-darkyellow underline ml-2">Sign Up</p>
            </Link>
          </p>
        </>
      ) : formOutput.button === 'Sign Up' ? (
        <>
          <p className="mt-10 font-semibold text-center text-base text-main-color-lightgrey flex justify-center">
            Already have an account?{' '}
            <Link to={'/login'}>
              <p className="leading-6 hover:text-accent-color-darkyellow underline ml-2">Login</p>
            </Link>
          </p>
        </>
      ) : null}
    </div>
  )
}
