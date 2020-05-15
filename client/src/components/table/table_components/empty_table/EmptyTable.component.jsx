import React from 'react';
import { Icon } from 'components';
import classes from './EmptyTable.module.scss';

const EmptyTable = _ => (
  <div className={classes.emptyTable}>
    <Icon icon='error' />
    <h1>No Content Available</h1>
  </div>
);

export default EmptyTable;
