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
  // const cached = localStorage.getItem('user') || defaultUserState;
  // console.debug('cached user:' + JSON.stringify(cached));
  let [user, setUser] = useState(defaultUserState);
  let history = useHistory();

  let authVal = {
    ...user,
    initiateLogin: (userData, cb) => {
      setUser({
        ...userData,
        authenticated: true
      });
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'trainer') {
        history.push('/trainer-home');
      } else if (user.role === 'associate') {
        history.push("/associate-home");
      } else {
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
