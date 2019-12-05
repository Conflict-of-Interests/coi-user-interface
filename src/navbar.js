import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg';
import {Link} from 'react-router-dom';

export default function RevNav(props) {
  return (
    <Navbar bg="light" expand="lg" id="app-nav">
      <Link to="/trainer-home">
        <Navbar.Brand href="#home">
          <img src={logo} className="App-logo" alt="logo" />
          RevNauts LaunchPad
      </Navbar.Brand>
      </Link>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/trainer-home">(Trainer) Home</Nav.Link>
          <Nav.Link href="/batch-dashboard">Batch Dashboard</Nav.Link>
          <Nav.Link href="/associate-home">(Associate) Home</Nav.Link>
          <Nav.Link href="/associate-dashboard">(Associate) Dashboard</Nav.Link>
          <Nav.Link href="/">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
