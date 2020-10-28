import React, { useState } from 'react';

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
        handleAnswer(choice === question.correct)
    }

    return ( 
        <>
        <div>
            {question.question}
        </div>
        {!showAnswers ?
        <button onClick={() => getAnswers()}>Reveal Answers</button>
        :
        choices.map(choice => {
            return <button onClick={handleClick(choice)}>{choice}</button>
        })
        }
        </>
        
     );
}
 
export default Question;