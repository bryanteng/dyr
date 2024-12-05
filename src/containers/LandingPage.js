import React from "react";
import './LandingPage.css'
import ColorSquare from '../images/color_square.jpg'
import MiniGrid from "../components/MiniGrid";

const LandingPage = ({setVisible}) => {

    return (
        <div className="landing-page-container"> 
            {/* <img className="color-square" src={ColorSquare}></img> */}
            <MiniGrid />
            <h1 className="title"> dyr </h1>
            <h2> Click on the odd color rectangle. </h2>
            <button className="play-button" onClick={()=> setVisible(false)}> Play </button>
        </div>
    )
}

export default LandingPage