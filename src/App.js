import React from 'react';
import './App.css';
import MyNavBar from './components/navBar/navBar';
import NavBarNotAuthenticated from './components/navBar/navBarNotAuthenticated';
import { LoggedIn, LoggedOut } from '@solid/react';

function App() {
  return (
    <div className="App">
      <LoggedOut>
        <NavBarNotAuthenticated />
      </LoggedOut>
      <LoggedIn>
        <MyNavBar />
      </LoggedIn>
    </div>
  );
}

export default App;
