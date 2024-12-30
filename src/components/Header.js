import React, {useState, useEffect, useRef} from "react";
import './Header.css'

const Header = ({showHeader, toggleNavbar, mode, setMode}) => {

    const gamemodes = ['daily', 'sprint', 'zen']
    const [isDropdownOpen, setIsDropdownOpen] = useState(false) 
    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
        console.log('dropdown is ', isDropdownOpen)
    }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //         setIsDropdownOpen(false)
    //       }
    //     }
    
    //     document.addEventListener("click", handleClickOutside)
    //     return () => {
    //       document.removeEventListener("click", handleClickOutside)
    //     }
    //   }, [])

    return (
        <>
        {showHeader ? 
        <header className="header-container"> 
            <span id="menu-button" className="menu-button" onClick={toggleNavbar} > // </span>
            <span id="game-title" className="game-title"> 
            <text onClick={toggleDropdown}> DYR {mode} </text>
            <button id="gamemode-dropdown" onClick={toggleDropdown} className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}` }> </button> 
            {isDropdownOpen ? (
              <ul className="dropdown-menu" ref={dropdownRef}>
                {gamemodes.map((gamemode) => (
                  <li
                    key={gamemode}
                    className={`dropdown-item ${
                      mode === gamemode ? "active" : ""
                    }`}
                    onClick={() => {
                      setMode(gamemode)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {gamemode}
                  </li>
                ))}
              </ul>
            ) : null}

            </span>
            <span className="settings-button"> * </span>

        </header>
        : null
        }
        </>
    )
}

export default Header