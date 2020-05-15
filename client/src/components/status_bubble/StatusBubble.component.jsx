import React from 'react';
import classes from './StatusBubble.module.scss';

const StatusBubble = ({ value }) => {
  const mappedColor = {
    active: '#00FF70',
    inactive: 'red',
  }[value];

  return <div className={classes.statusBubble} style={{ backgroundColor: mappedColor }} />;
};

export default StatusBubble;
