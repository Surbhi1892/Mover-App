import * as React from 'react';

const defaultValue = {
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  restoreToken: async () => {},
};

const AuthContext = React.createContext(defaultValue);

export default AuthContext;
