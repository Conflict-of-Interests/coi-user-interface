import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './login.js';
import AssociateHome from './associate_home.js';
import RevNav from './navbar.js';
import Footer from './footer.js';
import logo from './logo.svg';
import './App.scss';

function App() {
  const AssociatePage = (
    <>
    <RevNav />
    <AssociateHome />
    <Footer />
    </>
  )
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/associate-home">
            {AssociatePage }
          </Route>
          <Route path="/trainer-home">
            {
              // nothing for now
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
