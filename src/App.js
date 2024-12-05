import React, {useState, useEffect} from 'react'
import './App.css';
import Grid from './components/Grid'
import LandingPage from './containers/LandingPage'

function App() {

  const [landing, setLanding] = useState(true)

  return (
    <div className="App">
      { landing ? <LandingPage setVisible={setLanding} /> : <Grid/> }      
    </div>
  );
}

export default App;
