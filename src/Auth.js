import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from './AuthContext';

export default function Auth(props) {
  const defaultUserState = {
    authenticated: false,
    firstName: '',
    lastName: '',
    role: ''
  }
  const cached = localStorage.getItem('user') || defaultUserState;
  console.debug('cached user:' + JSON.stringify(cached));
  let [user, setUser] = useState(defaultUserState);
  let history = useHistory();

  let authVal = {
    ...user,
    initiateLogin: (userData) => {
      console.debug(`received role ${userData.role} from login`);
      const newUserState = {
        ...userData,
        authenticated: true
      };
      setUser(newUserState);
      localStorage.setItem('user', JSON.stringify(newUserState));
      if (newUserState.role === 'trainer') {
        console.debug('rerouting to trainer home');
        history.push('/trainer-home');
      } else if (newUserState.role === 'associate') {
        console.debug('rerouting to associate home');
        history.push("/associate-home");
      } else {
        console.debug('rerouting to /');
        history.push("/");
      }
    },
    handleAuth: () => {
      // magically authenticate the user
    },
    logout: () => {
      setUser(defaultUserState);
      localStorage.removeItem('user');
    }
  }

  return (
    <AuthContext.Provider value={authVal}>
      {props.children}
    </AuthContext.Provider>
  );
}
