import React from "react";
import './LandingPage.css'
import ColorSquare from '../images/color_square.jpg'

const LandingPage = ({setVisible}) => {

    return (
        <div className="landing-page-container"> 
            <img className="color-square" src={ColorSquare}></img>
            <h1 className="title"> DYR </h1>
            <h2> Click on the odd color rectangle. </h2>
            <button className="play-button" onClick={()=> setVisible(false)}> Play </button>
        </div>
    )
}

export default LandingPage