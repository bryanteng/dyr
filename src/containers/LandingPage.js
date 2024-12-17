import React from "react";
import './LandingPage.css'
import MiniGrid from "../components/MiniGrid";

const LandingPage = ({setVisible, setShowHeader}) => {

    const showApp = () => {
        setVisible(false)
        setShowHeader(true)
    }

    return (
        <div className="landing-page-container"> 
            <MiniGrid />
            <h1 className="title"> dyr </h1>
            <h2> Click on the odd color rectangle. </h2>
            <button className="play-button" onClick={showApp}> Play </button>
        </div>
    )
}

export default LandingPage