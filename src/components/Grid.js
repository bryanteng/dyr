import React, { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const [colors, setColors] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(null);

  useEffect(() => {
    const baseHue = Math.floor(Math.random() * 360);
    const baseSaturation = 70;
    const baseLightness = 50;

    const shades = Array.from({ length: 16 }).map((_, index) => {
      const lightness = baseLightness + (index % 4 - 2) * 10;
      return `hsl(${baseHue}, ${baseSaturation}%, ${Math.min(Math.max(lightness, 20), 80)}%)`;
    });

    const randomIndex = Math.floor(Math.random() * 16);
    setColors(shades);
    setHighlightIndex(randomIndex);
  }, []);

  return (
    <div className="page-container">
      <div className="grid-container">
        {colors.map((color, index) => (
          <span
            key={index}
            className="grid-item"
            style={{
              backgroundColor: index === highlightIndex ? `hsl(0, 100%, 50%)` : color,
            }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Grid;
