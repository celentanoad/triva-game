import React, { useState } from 'react';
import './App.css';

const Question = ({ question, handleAnswer }) => {
    const [choices, setChoices] = useState(['', '', '', ''])
    const [showAnswers, setShowAnswers] = useState(false);
    const [message, setMessage] = useState(null)

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
        // if (choice === question.correct) {
        //     setMessage('You got it right!')
        // } else {
        //     setMessage(`Wrong! The correct answer is ${question.correct}`)
        // }
        handleAnswer(choice, question.correct)
    }

    return ( 
        <>
        <div>
            {question.question}
        </div>
        <div className="choices-grid">
        {!showAnswers ?
        getAnswers()
        // <button onClick={getAnswers}>Reveal Answers</button>
        :
        choices.map((choice, idx) => {
            return <button id={idx} className="choices" onClick={() => handleClick(choice)}>{choice}</button>
        })
        }
        </div>
        <p>{message}</p>
        </>
        
     );
}
 
export default Question;