import React from 'react';
import classNames from 'classnames';
import { TableActions } from '..';
import classes from './TableRows.module.scss';

const TableRows = ({ columnDefs, gridTemplateColumns, rowData, onDelete, onComplete }) => (
  <div className={classes.tableRowsContainer}>
    {rowData.map(row => (
      <div key={row._id} className={classes.row} style={{ gridTemplateColumns }}>
        {columnDefs.map(({ CustomCell, valueGetter, field, className, header }) => {
          const value = valueGetter ? valueGetter(row) : row[field];
          return (
            <div key={`${row._id}-${header}`} className={classNames(classes.cell, classes[className])}>
              {CustomCell ? <CustomCell data={row} /> : value || '- - -'}
            </div>
          );
        })}
        <TableActions row={row} onDelete={_ => onDelete(row)} onComplete={_ => onComplete(row)} />
      </div>
    ))}
  </div>
);

export default TableRows;
