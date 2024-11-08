import React, { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const [difficulty, setDifficulty] = useState(1)
  const [colors, setColors] = useState([]);
  const [highlightColor, setHighlightColor] = useState("")
  const [highlightIndex, setHighlightIndex] = useState(null);

  useEffect(() => {
    const baseHue = Math.floor(Math.random() * 360);
    const baseSaturation = 70;
    const baseLightness = Math.floor(30 + Math.random() * 70);

    const shades = Array.from({ length: 16 }).fill(`hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%)`);

    let offset = 0
    let difficultyOffset = 10 +  (5 - difficulty) * 10
    if(difficulty === 1){
      offset = difficultyOffset 
    } else if(difficulty === 2){
      offset = difficultyOffset 
    } else if (difficulty === 3){
      offset = difficultyOffset 
    } else if(difficulty === 4) {
      offset = difficultyOffset 
    } else {
      offset = difficultyOffset 
    }

    if(baseLightness >= 60){
      // easy easymedium medium mediumhard hard
      offset = offset * -1
    }
    
    setHighlightColor(`hsl(${baseHue}, ${baseSaturation + offset}%, ${baseLightness }%)`)
    const randomIndex = Math.floor(Math.random() * 16);
    shades[randomIndex] = `hsl(${baseHue}, ${baseSaturation + offset}%, ${baseLightness }%)`

    setColors(shades);
    setHighlightIndex(randomIndex);
  }, [difficulty]);

  const changeDifficulty = (e) => {
    setDifficulty(difficulty+ (e.target.id === "down" ? -1 : 1))
  }

  const spanClick = (e) => {
    console.log(e.target.id == highlightIndex)
  }

  return (
    <div className="page-container">
      <div className="grid-container">
        {colors.map((color, index) => (
          <span
            id={index}
            key={index}
            onClick={spanClick}
            className="grid-item"
            style={{
              backgroundColor: index === highlightIndex ? highlightColor : color,
            }}
          >
            { color}
            {/* {index === highlightIndex ? -index : index} */}
          </span>
        ))}
        <h1>{difficulty}</h1>

        <button id="down" onClick={changeDifficulty}> - </button>
        <button id="up" onClick={changeDifficulty}> + </button>
      </div>
    </div>
  );
};

export default Grid;
