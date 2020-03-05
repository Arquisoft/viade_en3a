import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { HashRouter, Route, Link } from "react-router-dom";

const Home = () => <h1>Bienvenid@</h1>
const Features = () => <h1>Features</h1>
const Pricing = () => <h1>Pricing</h1>

const Action = () => <h1>Action</h1>
const Action3_1 = () => <h2>Action3.1</h2>
const Action3_2 = () => <h2>Action3.2</h2>
const Action3_3 = () => <h2>Action3.3</h2>

function App() {
  return (
      <HashRouter basename='/'>
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
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
                <Nav.Link href="#deets">Sign in</Nav.Link>
                <Nav.Link href="#memes">Sign up</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <header id="mainView" className="App-header">
            <Route exact path="/home" component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/action" component={Action} />
            <Route path="/action/3.1" component={Action3_1} />
            <Route path="/action/3.2" component={Action3_2} />
            <Route path="/action/3.3" component={Action3_3} />
          </header>
        </div>
    </HashRouter>


  );
}

export default App;