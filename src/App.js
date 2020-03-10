import React from 'react';
import RouteList from './components/routeList/RouteList';
import './App.css';
import MyNavBar from './components/navBar/navBar';




function App() {
  return (
    <div className="App">
      <MyNavBar/>
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




export default App;
