import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Login, Profile, Tasks, Unauthenticated } from 'pages';
import { AuthRoute, Navigation } from 'components';

const Content = _ => (
  <>
    <Navigation />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/unauthenticated' component={Unauthenticated} />
      <AuthRoute path='/profile' component={Profile} />
      <AuthRoute path='/tasks' component={Tasks} />
      <Route component={() => <Redirect to='/' />} />
    </Switch>
  </>
);

export default Content;
