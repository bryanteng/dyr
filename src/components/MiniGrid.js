import React, {useState, useEffect, useRef} from "react";
import {generateRandomHex, calculateTintAndShade} from './util'

import './MiniGrid.css'

// specify height, width, if animate
const MiniGrid = ({height, width, animate}) => {

    const [colors, setColors] = useState([
            "#FFFFFF",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000"
        ])

    const [highlightIndex, setHighlightIndex] = useState(0)
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            updateHighlight()
        }, 500); // Update highlight every .5s

        return () => clearInterval(timerRef.current); 

    },[])

    const updateHighlight = () => {

        const color = generateRandomHex()
        const {tint, shade} = calculateTintAndShade(color, .3)
        const newFill = Array.from({ length: 16 }).fill(color);

        const index = (highlightIndex + Math.floor(Math.random() * 16)) %15
        setHighlightIndex(index)
        
        newFill[index] = (Math.random() > 0.5 ? shade.hex : tint.hex);
 
        setColors(newFill)
    }

    return (
        <div className="mini-grid-container">
            {colors.map((color, index) => (
            <span
                id={index}
                key={index}
                className={`mini-grid-item spin-animation`}
                style={{
                backgroundColor: color
                }}
            >
                {"       "}
            </span>
            ))}
        </div>
        
    )
}

export default MiniGrid