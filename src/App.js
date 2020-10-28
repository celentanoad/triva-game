import React, { useState } from 'react';
import './App.css';
// const questionsData = require('./data/Apprentice_TandemFor400_Data.json');
import questionsData from './data/Apprentice_TandemFor400_Data.json';
import Question from './Question';


function App() {
  const [questions, setQuestions] = useState(null)
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0)

  const startRound = () => {
      let randomIdx;
      let roundQuestions = [];
      let previousIdx = [];
      const getRandomIdx = () => {
        return Math.floor(Math.random()*(questionsData.length-1));
      }
      while (roundQuestions.length < 10) {
        randomIdx = getRandomIdx();
        if (previousIdx.includes(randomIdx)) randomIdx = getRandomIdx();
        previousIdx.push(randomIdx);
        roundQuestions.push(questionsData[randomIdx]);
      }
      setQuestions(roundQuestions);
      setPlaying(true);
    }

    const handleAnswer = (result) => {
      if (result) {
        setScore(score+1)
      }
      let newQuestion = counter + 1
      console.log(newQuestion)
      setCounter(2)
    }
  

  return (
    <div className="App">
      <header className="App-header">
        <div>Score: {score}</div>
        {!playing ?
        <>
        <h2>Let's play trivia!</h2>
        <button onClick={() => startRound()}>Click here to start a new round</button>
        </>
        :
        <Question question={questions[counter]} handleAnswer={handleAnswer}/>
        }
      </header>
    </div>
  );
}

export default App;
