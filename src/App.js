import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';
import MyMap from './components/MyMap';
import Route from './Route.js'

function App() {
  return (
    <div  className="App">
      <header id="main" className="App-header">
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
		<Button variant='contained' color='primary' onClick={()=>showMap()}>
			See Map
		</Button>
		<div id="container"  style= {{width:'400px', height:'400px'}}></div>
      </header>
    </div>
  );
}
   
export default App; 

function showMap(){
	
	const points= [[43.211820, -5.787902],
			[43.210796, -5.786690],
			[43.210082, -5.785064],
			[43.209800, -5.783841],
			[43.210121, -5.782339],
			[43.210379, -5.780773],
			[43.209754, -5.777683]];
	
	
	ReactDOM.render(<MyMap route={new Route(points)} zoom= {13}  /> ,document.getElementById('main'));

}