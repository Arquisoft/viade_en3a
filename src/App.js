import React from 'react';
import "./css/App.css";
import MyNavBar from './components/navBar/navBar';
import NavBarNotAuthenticated from './components/navBar/navBarNotAuthenticated';
import { LoggedIn, LoggedOut } from '@solid/react';
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter basename='/'>
        <LoggedOut>
          <NavBarNotAuthenticated />
        </LoggedOut>
        <LoggedIn>
          <MyNavBar />
        </LoggedIn>
      </HashRouter>
    </div>
  );
}

export default App;
