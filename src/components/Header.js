import React from "react";
import './Header.css'

const Header = ({showHeader, toggleNavbar}) => {

    return (
        <>
        {showHeader ? 
        <header className="header-container"> 
            <span id="menu-button" className="menu-button" onClick={toggleNavbar} > // </span>
            <span id="game-title" className="game-title"> DYR Daily </span>
            <span className="settings-button"> * </span>

        </header>
        : null
        }
        </>
    )
}

export default Header