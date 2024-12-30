import React, {useState, useEffect} from 'react'
import './App.css';
import Grid from './components/Grid'
import LandingPage from './containers/LandingPage'
import Header from './components/Header';

function App() {

  const [landing, setLanding] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [today, setToday] = useState('')
  const [mode, setMode] = useState('daily') // daily zen sprint

  useEffect(() => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const date = new Date().toLocaleDateString('en-UK', options).split('/')
    const day = date[0]
    const month = date[1]
    const year = date[2]
    const dateString = `${year}-${month}-${day}`
    console.log(dateString);
    fetch(`https://colors.zoodinkers.com/api?date=${dateString}`)
      .then(resp => resp.json())
      .then( data => console.log(data))
  })

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <div className='app-wrapper'>
      <Header showHeader={showHeader} toggleNavbar={toggleNavbar} mode={mode} setMode={setMode} /> 
      <div className="app-grid-wrapper">
        { landing ? <LandingPage setVisible={setLanding} setShowHeader={setShowHeader} /> : <Grid showNavbar={showNavbar} setShowNavbar={setShowNavbar} mode={mode} /> }      
      </div>
    </div>

  );
}

export default App;
