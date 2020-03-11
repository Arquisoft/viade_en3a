import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthButton } from '@solid/react';
import { HashRouter, Route } from 'react-router-dom';
import RegisterWindow from '../registerWindow/registerWindow';

function NavBarNotAuthenticated(props) {
  return (
    <HashRouter basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Viade</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link className="mt-1 mr-2" href="#/register">Sign up</Nav.Link>
            <AuthButton className="btn btn-outline-light" popup="https://solid.community/common/popup.html" login="Sign in" logout="Sign out" />
            <Nav.Link href="https://github.com/Arquisoft/viade_en3a" target="_blank">
              <img
                src="github.png"
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
    </HashRouter>
  );
}

export default NavBarNotAuthenticated;