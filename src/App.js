import React, {useState, useEffect} from 'react'
import './App.css';
import Grid from './components/Grid'
import LandingPage from './containers/LandingPage'
import Header from './components/Header';

function App() {

  const [landing, setLanding] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <div className='app-wrapper'>
      <Header showHeader={showHeader} toggleNavbar={toggleNavbar}/> 
      <div className="app-grid-wrapper">
        { landing ? <LandingPage setVisible={setLanding} setShowHeader={setShowHeader} /> : <Grid showNavbar={showNavbar} setShowNavbar={setShowNavbar} /> }      
      </div>
    </div>

  );
}

export default App;
