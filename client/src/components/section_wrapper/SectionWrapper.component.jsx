import React from 'react';
import classNames from 'classnames';
import classes from './SectionWrapper.module.scss';

const SectionWrapper = ({ className, children }) => (
  <div className={classes.sectionWrapper}>
    <div className={classNames(classes.content, classes[className])}>{children}</div>
  </div>
);

export default SectionWrapper;
