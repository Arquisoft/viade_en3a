import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';
import MyMap from './components/MyMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React. Developed using Docker.
        </a>
		<Button variant='contained' color='primary' onClick={()=>goToMap()}>
			See Map
		</Button>
		<div id="container"  style= {{width:'400px', height:'400px'}}></div>
      </header>
    </div>
  );
}
   
export default App; 

function goToMap(){
	ReactDOM.render(<MyMap/>, document.getElementById ('container')); 


}