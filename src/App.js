import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Auth from './Auth';
import AuthContext from './AuthContext';
import Login from './login';
import AssociateHome from './associate_home';
import AssociateDashboard from './associate_dashboard';
import TrainerHome from './trainer_home';
import BatchDashboard from './batch_dashboard';
import RevNav from './navbar';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.debug('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.debug(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.debug(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

const DynamicRouter = process.env.NODE_ENV === 'production' ? Router : DebugRouter;

function App() {
  return (
    <div className="App">
        <DynamicRouter>
          <Auth>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route>
              <RevNav />
              <div id="main-app-container">
                <AuthContext.Consumer>
                  { ({authenticated}) => !authenticated ?
                    (<Redirect to="/"/>) :
                    (
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
                    )
                  }
                </AuthContext.Consumer>
              </div>
              <Footer />
            </Route>
          </Switch>
        </Auth>
      </DynamicRouter>
      <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_RIGHT} />
    </div>
  );
}

export default App;
