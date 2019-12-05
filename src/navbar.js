import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg';

export default function RevNav(props) {
  return (
    <Navbar bg="light" expand="lg" id="app-nav">
      <Navbar.Brand href="/trainer-home">
        <img src={logo} width="50" height="50" className="App-logo" alt="logo" />
        RevNauts LaunchPad
      </Navbar.Brand>
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
