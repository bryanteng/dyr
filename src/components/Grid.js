import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';
import {generateRandomHex, calculateTintAndShade} from './util'
import Modal from './Modal'

const Grid = () => {
  const [isModalVisible, setIsModalVisible] = useState(true)

  const [difficulty, setDifficulty] = useState(0);
  const [level, setLevel] = useState(1);

  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)

  const [colors, setColors] = useState(Array.from({ length: 16 }).fill('#000000'));
  const [highlightIndex, setHighlightIndex] = useState(null);

  const [flash, setFlash] = useState(false)
  const [flashColor, setFlashColor] = useState('') // correct or wrong
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Timer logic
    if(isRunning){
      const startTime = Date.now() - time; // Adjust for elapsed time
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Update every 10ms
    }
    else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isRunning, difficulty]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false)
  };

  const startGame = () => {
    resetTimer()
    setScore(0)
    setLevel(1)
    setDifficulty(0)
    setIsRunning(true)
  }

  useEffect(() => {
    if(isRunning){
      const color = generateRandomHex()
      const {tint, shade} = calculateTintAndShade(color, (30-difficulty)/100)
      const shades = Array.from({ length: 16 }).fill(color);
  
      const randomIndex = Math.floor(Math.random() * 16);
      shades[randomIndex] = (Math.random() > 0.5 ? shade.hex : tint.hex);
  
      setColors(shades);
      setHighlightIndex(randomIndex);
    }
  }, [isRunning, difficulty]);

  const changeDifficulty = (e) => {
    setDifficulty(difficulty + (e.target.id === 'down' ? -1 : 1));
  };

  const spanClick = (e) => {
    const isCorrect = parseInt(e.target.id) === highlightIndex;
    console.log(isCorrect ? 'Correct!' : 'Try again!');
    if(!isRunning) return
    if (isCorrect) {
      setDifficulty(difficulty+2)
      // scoring calculation criteria
      // fast -> track how much time it takes to get the right answer 
      // difficult -> more difficult more points
      // tries -> wrong answer deduct points immediately? gain less from a correct answer if more tries?
      setScore(score + (100 * (1 - tries/10) ))
      setTries(0)
      setLevel(level + 1)
      handleFlash('correct')
     // check for game end round (15) and end the game, maybe show leaderboard?
    } else {
      setTries(tries+1)
      handleFlash('wrong')
      setScore(score - 10)
    }
  };

  const handleFlash = (color) => {
    setFlash(true);
    setFlashColor(color)
    setTimeout(() => {
      setFlash(false)
      setFlashColor('')
    }, 400); // Flash for 500ms
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };

  // score calculation table by round 
  // round | tries  | time taken | score
  // 1     | 1      | 0.00s      | 100
  // 2     | 1      | 0.00s      | 200
  // ------------------------------------
  //                             | 300

  // Leaderboard -> only persist 3 to 10 scores in localstorage.
  // name  | score
  // a     | 100
  // b     | 200

  return (
    <div className="page-container">
        <div className='page-header'> 
          <span> DYR </span>
        </div>
      <div> 

        <h1>Level: {level} Difficulty: {difficulty}</h1>
        <h1>score: <span className={`scoreSpan ${flash ? (flashColor ? flashColor : '' ) : ''}`}>{score}</span></h1>

        <div className="timer">
          Time: {formatTime(time)}
        </div>
        <button id="log colors" onClick={()=> console.log(colors)}> colros</button>

        <button id="resettimer" onClick={resetTimer}> reset </button>
      </div>

      <div className="grid-container">
        {colors.map((color, index) => (
          <span
            id={index}
            key={index}
            onClick={spanClick}
            className={`grid-item ${time > 1 ? 'spin-animation' : null}`}
            style={{
              backgroundColor: color
            }}
          >
            {"       "}
          </span>
        ))}
        { isRunning ? null :  <button id="starttimer" className="startButton" onClick={startGame}> start </button> }
        { isModalVisible ? <Modal setIsModalVisible={setIsModalVisible} /> : null }
      </div>
    </div>
  );
};

export default Grid;
