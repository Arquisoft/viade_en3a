import React from 'react';
import './App.css';
import MyNavBar from './components/navBar/navBar';
import NavBarNotAuthenticated from './components/navBar/navBarNotAuthenticated';
import { LoggedIn, LoggedOut } from '@solid/react';
 
function App() {
  return (
    <div className="App">
      <LoggedOut>
        <NavBarNotAuthenticated/>
        <p>You are not logged in, and this is a members-only area!</p>
      </LoggedOut>
      <LoggedIn>
        <MyNavBar />
        <p>You are logged in and can see the special content.</p>
      </LoggedIn>
    </div>
  );
}

export default App;
