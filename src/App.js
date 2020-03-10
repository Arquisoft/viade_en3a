import React from 'react';
import CustomNavBar from './components/navBar/CustomNavBar';
import SolidThing from './components/podService/podTry';
import './App.css';

function App() {
  return (
    <div className="App">
      <CustomNavBar />
      <button id="main" onClick={() => SolidThing()}>
        Trigger solid thing
		  </button>
    </div >
  );
}

export default App;