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
  let [user, setUser] = useState(defaultUserState);
  let history = useHistory();

  let authVal = {
    ...user,
    initiateLogin: (user, cb) => {
      setUser({
        ...user,
        authenticated: true
      });
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
    }
  }

  return (
    <AuthContext.Provider value={authVal}>
      {props.children}
    </AuthContext.Provider>
  );
}
