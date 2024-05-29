import React, { useReducer } from "react"
import Header from "../../components/Header"
import data from '../../Data.json'

interface Question {
  id: number,
  text: string,
  options: string[],
}

interface Series {
  series: number,
  questions: Question[],
}

interface State {
  currentSeries: number,
  answers: { questionId: number; answer: string }[],
}

interface Action {
  type: 'ANSWER_QUESTION' | 'NEXT_SERIES',
  payload?: { questionId: number; answer: string },
}

const initialState: State = {
  currentSeries: 0,
  answers: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload!],
      }
    case 'NEXT_SERIES':
      return {
        ...state,
        currentSeries: state.currentSeries + 1,
      }
    default:
      return state
  }
};

export default function GenerateIdea() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleAnswer = (questionId: number, answer: string) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } })
    if (state.currentSeries < data.generateIdeaQuestions.length - 1) {
      dispatch({ type: 'NEXT_SERIES' })
    } else {
      console.log('All questions answered:', state.answers);
      // backend logic will go here
    }
  }

  const questions: Series[] = data.generateIdeaQuestions

  return (
    <div>
      <Header useCase="protected" />
      <div className="p-4">
        {questions[state.currentSeries].questions.map((question: Question) => (
          <div key={question.id} className="flex flex-col justify-center items-center">
            <h3 className="text-3xl font-semibold text-main-color-lightgrey mx-auto text-center mt-14 mb-12">{question.text}</h3>
            {question.options.map((option, index) => (
              <div key={option} >
                <button onClick={() => handleAnswer(question.id, option)}>
                  <div className="card">
                    {option}
                  </div>
                </button>
                {index + 1 !== question.options.length ? (
                  <p className="text-main-color-lightgrey text-lg my-6 mx-auto text-center">Or </p>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
