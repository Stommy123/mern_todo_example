import React from 'react';
import classNames from 'classnames';
import { EmptyTable, TableHead, TableRows } from './table_components';
import classes from './Table.module.scss';

const Table = ({ columnDefs, rowData, onComplete, onDelete, onAddNew, title }) => {
  const gridTemplateColumns = [...columnDefs, {}].map(_ => 'minmax(60px, 1fr)').join(' ');

  return (
    <>
      <div className={classNames(classes.header, { [classes.withHeader]: title || onAddNew })}>
        {title && <h1>{title}</h1>}
        {onAddNew && <button onClick={onAddNew}>Add New</button>}
      </div>
      {rowData.length ? (
        <div className={classes.tableContainer}>
          <TableHead columnDefs={columnDefs} gridTemplateColumns={gridTemplateColumns} />
          <TableRows
            columnDefs={columnDefs}
            rowData={rowData}
            onComplete={onComplete}
            onDelete={onDelete}
            gridTemplateColumns={gridTemplateColumns}
          />
        </div>
      ) : (
        <EmptyTable />
      )}
    </>
  );
};

export default Table;
