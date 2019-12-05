import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './login.js';
import AssociateHome from './associate_home.js';
import AssociateDashboard from './associate_dashboard.js';
import RevNav from './navbar.js';
import Footer from './footer.js';
import logo from './logo.svg';
import './App.scss';

function App() {
<<<<<<< HEAD
=======
  const AssociatePage = (
    <>
      <RevNav />
      <AssociateHome />
      <Footer />
    </>
  )
>>>>>>> 490c0e3e325b673b3194a248c6714ba7e2e430c8
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>
          <Route>
            <RevNav />
            <div id="main-app-container">
              <Switch>
                <Route path="/associate-home" component={AssociateHome}>

                </Route>
                <Route path="/associate-dashboard" component={AssociateDashboard}>
                </Route>
                <Route path="/trainer-home">
                  {
                    // nothing for now
                  }
                </Route>
              </Switch>
            </div>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
