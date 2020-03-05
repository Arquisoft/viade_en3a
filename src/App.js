import React from 'react';
import logo from './logo.svg';
import RouteList from './components/routeList/RouteList';
import CustomNavBar from './components/navBar/CustomNavBar';
import './App.css';

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
      </header>
    </div>
  );
}

export default App;