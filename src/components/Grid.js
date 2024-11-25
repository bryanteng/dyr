import React, { useState, useEffect, useRef } from 'react';
import './Grid.css';
import {generateRandomHex, calculateTintAndShade} from './util'

const Grid = () => {
  const [difficulty, setDifficulty] = useState(1);
  const [colors, setColors] = useState(Array.from({ length: 16 }).fill('#000000'));
  const [highlightColor, setHighlightColor] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);

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
  }, [isRunning]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);
  };

  useEffect(() => {
    if(isRunning){
      const color = generateRandomHex()
      const {tint, shade} = calculateTintAndShade(color, (40-difficulty)/100)
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
    if (isCorrect) {
      setDifficulty(difficulty+1)
    }
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="page-container">
      <div> 
        <h1>Difficulty: {difficulty}</h1>
        <div className="timer">
          Time: {formatTime(time)}
        </div>
        <button id="down" onClick={()=> console.log(colors)}> colros</button>

        <button id="starttimer" onClick={()=> setIsRunning(!isRunning)}> start </button>
        <button id="down" onClick={changeDifficulty}>
          -
        </button>
        <button id="up" onClick={changeDifficulty}>
          +
        </button>
      </div>

      <div className="grid-container">
        {colors.map((color, index) => (
          <span
            id={index}
            key={index}
            onClick={spanClick}
            className="grid-item"
            style={{
              backgroundColor: color
            }}
          >
            {"       "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Grid;
