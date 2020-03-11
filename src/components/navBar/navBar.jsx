import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthButton } from '@solid/react';
import { HashRouter, Route } from 'react-router-dom';

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
            <NavDropdown title="Routes" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#routes/see">Your routes</NavDropdown.Item>
              <NavDropdown.Item href="#routes/add">Create a route</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#routes/example">How do routes work?</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
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
      {/*<Route exact path="/profile" component={ProfileView} />*/}
      {/*<Route exact path="/friends" component={FriendsView} />*/}
      {/*<Route exact path="/routes/see" component={RoutesView} />*/}
      {/*<Route exact path="/routes/add" component={AddRoutesView} />*/}
      {/*<Route exact path="/routes/example" component={ExampleView} />*/}
    </HashRouter>
  );
}

export default MyNavBar;