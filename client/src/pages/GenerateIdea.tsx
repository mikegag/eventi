import React, { useReducer } from "react";
import Header from "../components/Header";

type Question = {
    id: number;
    text: string;
    options: string[];
  };
  
  type QuestionSeries = {
    series: number;
    questions: Question[];
  };
  
  type Answer = {
    questionId: number;
    answer: string;
  };
  
  type State = {
    currentSeries: number;
    answers: Answer[];
  };
  
  type Action =
    | { type: 'ANSWER_QUESTION'; payload: Answer }
    | { type: 'NEXT_SERIES' }

const questions: QuestionSeries[] = [
  {
    series: 1,
    questions: [
      { id: 1, text: 'Select One Option:', options: ['Give me a new date idea', 'Recommend one from my date list'] },
    ],
  },
  {
    series: 2,
    questions: [
      { id: 2, text: 'Where Would You Like To Go?', options: ['Somewhere close to me', "I'm feeling adventurous"] },
    ],
  },
  {
    series: 3,
    questions: [
      { id: 3, text: 'How Much Would You Like To Spend?', options: ['Keep it cheap!', 'Less than $80', 'I have no budget'] },
    ],
  },
  {
    series: 4,
    questions: [
      { id: 4, text: 'What do you prefer?', options: ['An Activity/Event', 'Something chill'] },
    ],
  }
]

const initialState: State = {
  currentSeries: 0,
  answers: [],
};

const reducer = (state:State, action: Action):State => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case 'NEXT_SERIES':
      return {
        ...state,
        currentSeries: state.currentSeries + 1,
      };
    default:
      return state;
  }
};

export default function GenerateIdea() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAnswer = (questionId:number, answer:string) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, answer } });
    if (state.currentSeries < questions.length - 1) {
      dispatch({ type: 'NEXT_SERIES' });
    } else {
      console.log('All questions answered:', state.answers);
      // Process the collected answers here
    }
  };

  return (
    <div>
        <Header useCase="protected" />
        <div>
            {questions[state.currentSeries].questions.map((question) => (
            <div key={question.id} className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-main-color-lightgrey mx-auto text-center my-14">{question.text}</h2>
                {question.options.map((option, index) => (
                <div key={option} className="flex flex-col items-center justify-center mx-auto">
                    <button
                        onClick={() => handleAnswer(question.id, option)}
                        className="w-full"
                    >
                        <div className="card">
                            {option}
                        </div>
                    </button>
                    {index + 1 !== question.options.length && (
                    <p className="text-main-color-lightgrey text-lg my-7">Or</p>
                    )}
                </div>
                ))}
            </div>
            ))}
        </div>
    </div>
  )
}
