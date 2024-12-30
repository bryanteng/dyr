import React, {useState, useEffect, useRef} from "react";
import './Scoreboard.css'

// receive array for round scores and leaderboard, showScores bool
const ScoreBoard = ({rounds}) => {

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

    // scoreboard should be collapsable 
    const [isOpen, setIsOpen] = useState(true)
    const [showScoreboard, setShowScoreboard] = useState(true)
    const [showLeaderboard, setShowLeaderboard] = useState(true)
    const [displayRounds, setDisplayRounds] = useState([])
    const scoreboardRef = useRef(null)

    useEffect(() => {
        let fixedDisplay = []
        if(rounds.length > 0) fixedDisplay = rounds.map((round) =>( {...round, score: round.score - (round.tries-1)*10}  ))
        const dummyRounds = Array.from({length: 15-rounds.length}).fill( {time: '--', tries: '--', score: '--'} )
        
        console.log(rounds, fixedDisplay, fixedDisplay.concat(dummyRounds))
        setDisplayRounds(fixedDisplay.concat(dummyRounds))
        // return fixedDisplay.concat(dummyRounds)
        if (scoreboardRef.current) {
            scoreboardRef.current.scrollTop = scoreboardRef.current.scrollHeight;
        }
    },[rounds])

    const getTotal = () => {
        if(rounds.length === 0) return 0
        if(rounds.length === 1) return rounds[0].score
        else{
            return displayRounds.reduce((a, b) => a + (b['score'] || 0), 0)
        }
    }

    return ( 
        <div className="scoreboard"  ref={scoreboardRef}>  
            <table className="score-table">
            <thead>
                <tr>
                <th> Level </th>
                <th> Time </th>
                <th> Tries </th>
                <th> Score </th>
                </tr>
            </thead>
            <tbody>
                {displayRounds.map((round, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{round.time}</td>
                    <td>{round.tries}</td>
                    <td>{round.score}</td>
                </tr>
                ))}
            </tbody>
            </table>
                <div className="total" onClick={()=> console.table(rounds)}> total: {getTotal()}</div>
        </div>
    )
}

export default ScoreBoard