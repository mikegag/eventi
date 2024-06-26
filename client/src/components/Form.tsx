import React, {useState} from 'react'
import { IconDefinition, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCreditCard, faFilePen, faLayerGroup, faLocationDot, faLock, faSignature } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import formData from '../Data.json'

interface FormProps {
  useCase: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>, formData: { [key: string]: string }) => void
}

interface FormConfig {
  title: string,
  ids: string[],
  labels: string[],
  types: string[],
  placeholders: string[],
  icons: string[],
  button: string,
  selectOptions?: string[]
}

const iconMap: Record<string, IconDefinition> = {
  faEnvelope,
  faSignature,
  faUser,
  faCreditCard,
  faFilePen,
  faLocationDot,
  faLayerGroup,
  faLock
}

export default function Form({ useCase, onSubmit }: FormProps) {
  const [formDataState, setFormDataState] = useState<{ [key: string]: string }>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormDataState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(event,formDataState)
  }

  function determineUseCase(givenCase: string): FormConfig {
    const formattedUseCase = givenCase.replace(/\s+/g, '').toLowerCase()
    if (formattedUseCase === 'signup') {
      return formData.formData.signup
    } else if (formattedUseCase === 'date') {
      return formData.formData.date
    }
    return formData.formData.login
  }

  const formOutput = determineUseCase(useCase)

  return (
    <div className={`mt-7 ${formOutput===formData.formData.date ? 'mt-6 lg:mt-1':''} sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-lg`}>
      <h3 className={`page-title ${formOutput===formData.formData.date ? 'mt-6 lg:mt-1':''}`}>{formOutput.title}</h3>
      <form onSubmit={handleSubmit}>
        {formOutput.ids.map((id, index) => (
          <div key={id}>
            <label htmlFor={id} className="form-label">
              <FontAwesomeIcon icon={iconMap[formOutput.icons[index]]} className="mr-3 text-base" />
              {formOutput.labels[index]}
            </label>
            <div className="mt-1">
              {formOutput.types[index] === 'text' ||
              formOutput.types[index] === 'email' ||
              formOutput.types[index] === 'password' ? (
                <input
                  id={id}
                  name={id}
                  type={formOutput.types[index]}
                  value={formDataState[id] || ''}
                  onChange={handleChange}
                  required
                  placeholder={formOutput.placeholders[index]}
                  className="form-input"
                  autoComplete='on'
                />
              ) : formOutput.types[index] === 'select' ? (
                <select
                  id={id}
                  name={id}
                  value={formDataState[id] || ''}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  {formOutput.selectOptions?.map((option, optionIndex) =>
                    optionIndex === 0 ? (
                      <option key={optionIndex} disabled value="">
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
                  id={id}
                  name={id}
                  value={formDataState[id] || ''}
                  onChange={handleChange}
                  required
                  placeholder={formOutput.placeholders[index]}
                  className="form-input max-h-14 min-h-14"
                />
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="form-submit-btn">
          {formOutput.button}
        </button>
      </form>

      {formOutput.button === 'Login' ? (
        <>
          <p className="mt-7 font-semibold text-center text-base text-main-color-lightgrey flex justify-center">
            Don't have an account?{' '}
            <Link to="/signup">
              <span className="leading-6 hover:text-accent-color-darkyellow underline ml-2">Sign Up</span>
            </Link>
          </p>
        </>
      ) : formOutput.button === 'Sign Up' ? (
        <>
          <p className="mt-7 font-semibold text-center text-base text-main-color-lightgrey flex justify-center">
            Already have an account?{' '}
            <Link to="/login">
              <span className="leading-6 hover:text-accent-color-darkyellow underline ml-2">Login</span>
            </Link>
          </p>
        </>
      ) : null}
    </div>
  )
}
