import React from 'react';
import { SectionWrapper } from 'components';
import classes from './Home.module.scss';

const Home = _ => (
  <SectionWrapper>
    <div className={classes.homeWrapper}>
      <h1>Welcome to your TODO App!</h1>
    </div>
  </SectionWrapper>
);

export default Home;
