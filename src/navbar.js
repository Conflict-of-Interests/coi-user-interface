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
            <Link to={auth.role === 'trainer' ? "/trainer-home" : "/associate-home"}>
              <Navbar.Brand>
                <img src={Rocket} className="App-logo" alt="logo" />
                RevNauts LaunchPad
              </Navbar.Brand>
            </Link>
            <span className="ml-3">
              {`Welcome, ${auth.firstName} ${auth.lastName}`}
            </span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbar-links" className="justify-content-end">
              <Nav>
                <Can
                  role={auth.role}
                  perform="trainer_home:view"
                  yes={() => (
                    <Nav.Item>
                      <Nav.Link to="/trainer-home" as={Link}>Home</Nav.Link>
                    </Nav.Item>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="batch_dashboard:view"
                  yes={() => (
                    <Nav.Item>
                      <Nav.Link to="/batch-dashboard" as={Link}>Batch Dashboard</Nav.Link>
                    </Nav.Item>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_home:view"
                  yes={() => (
                    <Nav.Item>
                      <Nav.Link to="/associate-home" as={Link}>Home</Nav.Link>
                    </Nav.Item>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_dashboard:view"
                  yes={() => (
                    <Nav.Item>
                      <Nav.Link to="/associate-dashboard" as={Link}>Dashboard</Nav.Link>
                    </Nav.Item>
                  )}
                />
                <Nav.Item>
                  <Nav.Link to="/" as={Link} onClick={auth.logout}>Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }
    </AuthContext.Consumer>
  )
}
