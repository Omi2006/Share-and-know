import React from 'react';

const LoggedInContext = React.createContext({});
export const LoggedInProvider = LoggedInContext.Provider;

export default LoggedInContext;
