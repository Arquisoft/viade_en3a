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
import Profile from '../../pages/Profile';
import Friends from '../../pages/Friends';
import EditProfile from '../../pages/EditProfile';
import InfoView from "../../pages/InfoView";

import gitHubLogo from './../../assets/githubLogo/github.png';
import viadeLogo from './../../assets/logo/logo_alt.jpeg';
import viadeText from './../../assets/logo/logo_letters.jpeg';
import RouteManager from "../../model/RouteManager";

const routeManager = new RouteManager();

function MyNavBar(props) {
  return (
    <HashRouter basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">
          <img
            src={viadeLogo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Viade logo"
          />
          <img
            src={viadeText}
            width="140"
            height="40"
            className="d-inline-block align-top"
            alt="Viade text"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Profile" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#profile">My profile</NavDropdown.Item>
              <NavDropdown.Item href="#friends">Friends</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item disabled="true" href="#setting">Settings</NavDropdown.Item>
            </NavDropdown>
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
      <Route exact path="/routes/add" render={() => <MapCreation routeManager={routeManager} />} />
      <Route exact path="/routes/list" render={() => <RouteList routeManager={routeManager} />} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" render={() => <Profile routeManager={routeManager} />} />
      <Route exact path="/friends" component={Friends} />
      <Route exact path="/editProfile" component={EditProfile} />
      <Route exact path="/routes/info/:id" render={(props) => <InfoView routeManager={routeManager} {...props} />} />
      <Redirect path="/" exact to="/home" />
    </HashRouter>
  );
}

export default MyNavBar;