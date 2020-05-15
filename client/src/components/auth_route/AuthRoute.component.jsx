import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from 'context';

const AuthRoute = props => {
  const { currentUser } = useContext(AppContext);

  return currentUser ? <Route {...props} /> : <Redirect to='/unauthenticated' />;
};

export default AuthRoute;
