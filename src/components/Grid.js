import React, { useState, useEffect, useRef } from "react";
import "./Grid.css";
import { generateRandomHex, calculateTintAndShade, fetchDailyColors } from "./util"
import Modal from "./Modal"
import ScoreBoard from "./ScoreBoard"
import Navbar from "./Navbar"

const Grid = ({ showNavbar, setShowNavbar }) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [difficulty, setDifficulty] = useState(0);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)

  const [gameMode, setGameMode] = useState("sprint") // daily sprint zen
  const [dailyColors, setDailyColors] = useState(Array(16).fill("#000000"));
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
]);  
  
  const [highlightIndex, setHighlightIndex] = useState(null);

  const [flash, setFlash] = useState(false)
  const [flashColor, setFlashColor] = useState("") // correct or wrong

  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const [roundTime, setRoundTime] = useState(0); // Time in milliseconds
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    // Timer logic
    if(isRunning){
      const startTime = Date.now() - time; // Adjust for elapsed time
      setRoundTime(Date.now())
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Update every 10ms
    }
    else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [isRunning, difficulty]);

  useEffect(()=> {
    if(dailyColors[0] === dailyColors[1] ){ // 2 dailyColors only ever equal on load hypothetically? maybe need a better failsafe? maybe 3 colors...
      fetchDailyColors(15).then((retColors) => {
        console.log(retColors)
        setDailyColors(retColors);
      });
    }
  })

  useEffect(() => {
    if(!isRunning) return

    let color
    if (gameMode === "daily") {
      color = dailyColors[level-1]
    } else if (gameMode === "sprint") {
      color = generateRandomHex()
    }

    const {tint, shade} = calculateTintAndShade(color, (30-difficulty)/100)
    const shades = Array.from({ length: 16 }).fill(color);

    const randomIndex = Math.floor(Math.random() * 16);
    shades[randomIndex] = (Math.random() > 0.5 ? shade.hex : tint.hex);

    setColors(shades);
    setHighlightIndex(randomIndex);
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
    setRounds([])
  }

  const endGame = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  }

  const spanClick = (e) => {
    const isCorrect = parseInt(e.target.id) === highlightIndex;
    console.log(isCorrect ? 'Correct!' : 'Try again!');
    if(!isRunning) return // do nothing if game isn't running

    if (isCorrect) {
      handleFlash('correct')
      const elapsedTime = formatTime(Date.now() - roundTime )
      const roundScore = Math.round(100 * (1 - tries/10))
      
      setDifficulty(difficulty+2)
      setRounds([... rounds, {time: elapsedTime, score: roundScore, tries: tries+1 }]) // eventually round should show time incrementing as round is progressing on the board

      // scoring calculation criteria
      // fast -> track how much time it takes to get the right answer 
      // difficult -> more difficult more points
      // tries -> wrong answer deduct points immediately? gain less from a correct answer if more tries?
      setScore(score + roundScore)

      // round "resetting"
      setTries(0)
      setLevel(level + 1)
      setRoundTime(Date.now())
      if(level == 15) endGame()
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

  // float right sidebar table, toggle between score and leaderboard
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
    <>
    <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
    <div className="page-container">
      <div> 

        <h1>Level: {level} Difficulty: {difficulty}</h1>
        <h1>score: <span className={`scoreSpan ${flash ? (flashColor ? flashColor : '' ) : ''}`}>{score}</span></h1>

        <div className="timer">
          {formatTime(time)}
        </div>
        <button id="log colors" onClick={()=> console.log(colors)}> colros</button>
        <button id="daily" onClick={()=> setGameMode('daily')}> daily</button>
        <button id="zen" onClick={()=> setGameMode('zen')}> zen</button>
        <button id="sprint" onClick={()=> setGameMode('sprint')}> sprint</button>

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
    <ScoreBoard rounds={rounds} />
    </>
  );
};

export default Grid;
