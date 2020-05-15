import React from 'react';
import classes from './TableHead.module.scss';

const TableHead = ({ columnDefs, gridTemplateColumns }) => (
  <div className={classes.tableHeadContainer} style={{ gridTemplateColumns }}>
    {columnDefs.map(column => (
      <div key={column.header} className={classes.columnHead}>
        {column.header}
      </div>
    ))}
    <div className={classes.columnHead}>Actions</div>
  </div>
);

export default TableHead;
