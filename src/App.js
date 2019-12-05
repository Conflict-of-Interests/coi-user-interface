import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './login.js';
import AssociateHome from './associate_home.js';
import AssociateDashboard from './associate_dashboard.js';
import TrainerHome from './trainer_home.js';
import BatchDashboard from './batch_dashboard.js';
import RevNav from './navbar.js';
import Footer from './footer.js';
import logo from './logo.svg';
import './App.scss';

function App() {

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
                <Route path="/trainer-home" component={TrainerHome}>
                </Route>
                <Route path="/batch-dashboard" component={BatchDashboard}>
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
