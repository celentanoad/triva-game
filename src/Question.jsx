import React, { useState } from 'react';
import './App.css';

const Question = ({ question, handleAnswer }) => {
    const [choices, setChoices] = useState(['', '', '', ''])
    const [showAnswers, setShowAnswers] = useState(false);

    const getAnswers = () => {
        setShowAnswers(true)
        let answers = [];
        for (let answer of question.incorrect) {
            answers.push(answer);
        }
        let randomIdx = Math.floor(Math.random() * 4);
        answers.splice(randomIdx, 0, question.correct);
        setChoices(answers)
    }

    const handleClick = (choice) => {
        handleAnswer(choice, question.correct)
    }

    return ( 
        <>
        <div className="question">
            {question.question}
        </div>
        <div className="choices-grid">
        {!showAnswers ?
        getAnswers()
        :
        choices.map((choice, idx) => {
            return <button id={idx} key={idx} className="choices" onClick={() => handleClick(choice)}>{choice}</button>
        })
        }
        </div>
        </>
        
     );
}
 
export default Question;