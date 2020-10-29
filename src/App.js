import React, { useState } from 'react';
import './App.css';
// const questionsData = require('./data/Apprentice_TandemFor400_Data.json');
import questionsData from './data/Apprentice_TandemFor400_Data.json';
import Question from './Question';


function App() {
  const [questions, setQuestions] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [revealQuestion, setRevealQuestion] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);

  const startRound = () => {
      let randomIdx;
      let roundQuestions = [];
      let previousIdx = [];
      const getRandomIdx = () => {
        return Math.floor(Math.random()*(questionsData.length-1));
      }
      while (roundQuestions.length < 10) {
        randomIdx = getRandomIdx();
        while (previousIdx.includes(randomIdx)) randomIdx = getRandomIdx();
        previousIdx.push(randomIdx);
        roundQuestions.push(questionsData[randomIdx]);
      }
      setQuestions(roundQuestions);
      setPlaying(true);
      setRevealQuestion(true);
  }

  const handleAnswer = (guess, corrrectAnswer) => {
    setRevealQuestion(false);
    if (guess === corrrectAnswer) {
      setScore(score+1);
      setMessage(`That's right!`)
    } else {
      setMessage(`Wrong! The correct answer is ${corrrectAnswer}`)
    }
    if (counter < 9) setCounter(counter+1)
    else setGameOver(true);
  }

  const resetGame = () => {
    setQuestions(null);
    setPlaying(false);
    setScore(0);
    setCounter(0);
    setRevealQuestion(false);
    setGameOver(false);
    setMessage(null);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="score">Score: {score}</div>
        {!playing ?
        <>
        <h2>Let's play trivia!</h2>
        <button onClick={() => startRound()}>Click here to start a new round</button>
        </>
        :
        gameOver ? 
        <>
        <p>Game Over! You got {score} out of 10 questions correct.</p>
        <button onClick={resetGame}>Play Again?</button>
        </>
        :
        revealQuestion ?
          <Question question={questions[counter]} handleAnswer={handleAnswer}/>
          :
          <>
          <p>{message}</p>
          <button onClick={() => setRevealQuestion(true)}>Next Question</button>
          </>
        }
      </header>
    </div>
  );
}

export default App;
