import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AppContext } from 'context';
import { Icon, SectionWrapper } from 'components';
import classes from './Unauthenticated.module.scss';

const Unauthenticated = _ => {
  const { currentUser } = useContext(AppContext);

  // if a logged in user wandered to this route by accident, we redirect them to the home page
  if (currentUser) return <Redirect to='/' />;

  return (
    <SectionWrapper>
      <div className={classes.unauthenticatedWrapper}>
        <Icon icon='error' />
        <h1>Unauthenticated!</h1>
        <h3>Please Login To Continue</h3>
      </div>
    </SectionWrapper>
  );
};

export default Unauthenticated;
