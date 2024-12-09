import React, {useState} from "react";

// receive array for round scores and leaderboard, showScores bool
const ScoreBoard = ({rounds}) => {

    const [showBoard, setShowBoard] = useState(true)

    return ( 
        <div className="scoreboard">  
            <table className="score-table">
            <thead>
                <tr>
                <th> Level </th>
                <th> Click Time (ms) </th>
                <th> Tries </th>
                <th> Score </th>
                </tr>
            </thead>
            <tbody>
                {rounds.map((round, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{round.time}</td>
                    <td>{round.tries}</td>
                    <td>{round.score}</td>
                </tr>
                ))}
            </tbody>
            </table>
                <div> total: {rounds.length > 1 ? rounds.reduce((a,b) => parseInt(a.score,0) + parseInt(b.score,0) ) : 0}</div>
        </div>
    )
}

export default ScoreBoard