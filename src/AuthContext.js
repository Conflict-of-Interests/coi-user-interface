import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  initiateLogin: () => {},
  authenticate: () => {
    this.isAuthenticated = true;
  },
  logout: () => {
    this.isAuthenticated = false;
  }
});

export default AuthContext;
