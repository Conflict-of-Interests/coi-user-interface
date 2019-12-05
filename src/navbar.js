import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.svg';

export default function RevNav(props) {
  return (
    <Navbar bg="light" expand="lg" id="app-nav">
      <Navbar.Brand href="#home">
        <img src={logo} className="App-logo" alt="logo" />
        RevNauts LaunchPad
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Batch</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
