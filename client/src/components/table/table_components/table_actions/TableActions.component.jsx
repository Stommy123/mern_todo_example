import React from 'react';
import classNames from 'classnames';
import classes from './TableActions.module.scss';

const TableActions = ({ onComplete, onDelete, row }) => (
  <div className={classNames(classes.cell, classes.actions)}>
    <button onClick={onComplete}>{row.isCompleted ? 'Reopen Task' : 'Mark Complete'}</button>
    <button className={classes.deleteBtn} onClick={onDelete}>
      Delete
    </button>
  </div>
);

export default TableActions;
