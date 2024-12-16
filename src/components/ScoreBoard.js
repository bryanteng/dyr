import React, {useState, useEffect} from "react";
import './Scoreboard.css'

// receive array for round scores and leaderboard, showScores bool
const ScoreBoard = ({rounds}) => {

    const [isOpen, setIsOpen] = useState(true)
    const [showScoreboard, setShowScoreboard] = useState(true)
    const [showLeaderboard, setShowLeaderboard] = useState(true)
    const [displayRounds, setDisplayRounds] = useState([])

    useEffect(() => {
        let fixedDisplay = []
        if(rounds.length > 0) fixedDisplay = rounds.map((round) =>( {...round, score: round.score - (round.tries-1)*10}  ))
        const dummyRounds = Array.from({length: 15-rounds.length}).fill( {time: '--', tries: '--', score: '--'} )
        
        console.log(rounds, fixedDisplay, fixedDisplay.concat(dummyRounds))
        setDisplayRounds(fixedDisplay.concat(dummyRounds))
        // return fixedDisplay.concat(dummyRounds)
    },[rounds])

    const getTotal = () => {
        if(rounds.length == 0) return 0
        if(rounds.length == 1) return rounds[0].score
        else{
            return displayRounds.reduce((a, b) => a + (b['score'] || 0), 0)
        }
    }

    return ( 
        <div className="scoreboard">  
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
                <div className="total" onClick={()=> console.log(rounds)}> total: {getTotal()}</div>
        </div>
    )
}

export default ScoreBoard