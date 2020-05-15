import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AppContext } from 'context';
import classes from './Navigation.module.scss';

const Navigation = _ => {
  const history = useHistory();
  const { currentUser, signOut } = useContext(AppContext);

  const handleAuth = _ => (currentUser ? signOut() : history.push('/login'));

  return (
    <div className={classes.navigationWrapper}>
      <div className={classes.title}>
        <h1>TODO APP {currentUser && `- ${currentUser.email}`}</h1>
      </div>
      <div className={classes.links}>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/tasks'>Tasks</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
      </div>
      <div className={classes.authLink}>
        <button onClick={handleAuth}>{currentUser ? 'Logout' : 'Login'}</button>
      </div>
    </div>
  );
};

export default Navigation;
