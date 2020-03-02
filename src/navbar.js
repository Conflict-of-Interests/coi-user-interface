import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import AuthContext from './AuthContext';
import Can from './Can';
import Rocket from './assets/rocket.svg';
import {Link} from 'react-router-dom';

export default function RevNav(props) {

  return (
    <AuthContext.Consumer>
      {(auth) => (
          <Navbar bg="light" expand="lg" id="app-nav">
            <Link to="/trainer-home">
              <Navbar.Brand>
                <img src={Rocket} className="App-logo" alt="logo" />
                RevNauts LaunchPad
              </Navbar.Brand>
            </Link>
            {`Welcome, ${auth.firstName} ${auth.lastName}`}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Can
                  role={auth.role}
                  perform="trainer_home:view"
                  yes={() => (
                    <Nav.Link href="/trainer-home">Home</Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="batch_dashboard:view"
                  yes={() => (
                    <Nav.Link href="/batch-dashboard">Batch Dashboard</Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_home:view"
                  yes={() => (
                    <Nav.Link href="/associate-home">Home</Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_dashboard:view"
                  yes={() => (
                    <Nav.Link href="/associate-dashboard">Dashboard</Nav.Link>
                  )}
                />
                <Nav.Link href="/" onClick={auth.logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }
    </AuthContext.Consumer>
  )
}
