import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import RouteList from './components/routeList/RouteList';
import CustomNavBar from './components/navBar/CustomNavBar';
import './App.css';
import MyMap from './components/myMap/MyMap';
import MyRoute from './components/myMap/MyRoute'; 
import EditableMap from './components/editableMap/EditableMap';
import { HashRouter, Route, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <CustomNavBar />
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
        <RouteList />
        <br />
        <RouteList />

       

      </header>
    </div>
  );
}



function showMap(){
	
	const points= [[43.211820, -5.787902],
			[43.210796, -5.786690],
			[43.210082, -5.785064],
			[43.209800, -5.783841],
			[43.210121, -5.782339],
			[43.210379, -5.780773],
			[43.209754, -5.777683]];
	
	
	ReactDOM.render(<MyMap route={new MyRoute(points)} zoom= {13}  /> ,document.getElementById('main'));


}

export default App;
