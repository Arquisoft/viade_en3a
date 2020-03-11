import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthButton } from '@solid/react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import RegisterWindow from '../registerWindow/registerWindow';
import MapCreation from '../../pages/MapCreation';
import RouteList from '../routeList/RouteList';
import Home from '../../pages/Home';

import gitHubLogo from './../../assets/github.png';

function MyNavBar(props) {
  return (
    <HashRouter basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Viade</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#friends">Friends</Nav.Link>
            <NavDropdown title="Route management" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#routes/list">My routes</NavDropdown.Item>
              <NavDropdown.Item href="#routes/add">Create a new route</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#routes/example">How do routes work?</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <AuthButton className="btn btn-outline-light" popup="https://solid.community/common/popup.html" login="Sign in" logout="Sign out" />
            <Nav.Link href="https://github.com/Arquisoft/viade_en3a" target="_blank">
              <img
                src={gitHubLogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="GitHub link"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/register" component={RegisterWindow} />
      <Route exact path="/routes/add" component={MapCreation} />
      <Route exact path="/routes/list" component={RouteList} />
      <Route exact path="/home" component={Home} />
      <Redirect from path="/" exact to="/home" />
    </HashRouter>
  );
}

export default MyNavBar;