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
            <span class="mr-3">
              {`Welcome, ${auth.firstName} ${auth.lastName}`}
            </span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Can
                  role={auth.role}
                  perform="trainer_home:view"
                  yes={() => (
                    <Nav.Link>
                      <Link to="/trainer-home">Home</Link>
                    </Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="batch_dashboard:view"
                  yes={() => (
                    <Nav.Link>
                      <Link to="/batch-dashboard">Batch Dashboard</Link>
                    </Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_home:view"
                  yes={() => (
                    <Nav.Link>
                      <Link to="/associate-home">Home</Link>
                    </Nav.Link>
                  )}
                />
                <Can
                  role={auth.role}
                  perform="associate_dashboard:view"
                  yes={() => (
                    <Nav.Link>
                      <Link to="/associate-dashboard">Dashboard</Link>
                    </Nav.Link>
                  )}
                />
                <Nav.Link>
                  <Link to="/">
                    <span onClick={auth.logout}>Logout</span>
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
      }
    </AuthContext.Consumer>
  )
}
