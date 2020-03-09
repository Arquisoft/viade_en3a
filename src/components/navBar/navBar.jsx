import React  from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  { AuthButton } from '@solid/react';

function MyNavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Viade</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Sign up</Nav.Link>
            <AuthButton className="btn btn-outline-light" popup="https://solid.community/common/popup.html" login="Sign in" logout="Sign out"/>
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
    );
}

export default MyNavBar;