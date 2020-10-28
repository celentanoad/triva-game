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

  const handleAnswer = (result) => {
    setRevealQuestion(false);
    if (result) {
      setScore(score+1);
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
        gameOver ? 
        <>
        <p>Game Over! You got {score} out of 10 questions correct.</p>
        <button onClick={resetGame}>Play Again?</button>
        </>
        :
        revealQuestion ?
          <Question question={questions[counter]} handleAnswer={handleAnswer}/>
          :
          <button onClick={() => setRevealQuestion(true)}>Next Question</button>
        }
      </header>
    </div>
  );
}

export default App;
