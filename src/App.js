import React from 'react';
import CustomNavBar from './components/navBar/CustomNavBar';
import SolidThing from './components/podService/podTry';
import file_client from './components/podService/solid_file_client';
import './App.css';

function App() {
  return (
    <div className="App">
      <CustomNavBar />
      <button id="main" onClick={() => file_client()}>
        Trigger solid thing
		  </button>
    </div >
  );
}

export default App;