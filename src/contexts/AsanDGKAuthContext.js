import * as React from 'react';

const defaultValue = {
    signIn: async () => {},
    signOut: async () => {},
    restoreToken: async () => {},
};

const AsanDGKAuthContext = React.createContext(defaultValue);

export default AsanDGKAuthContext;
