import React from 'react';
import moment from 'moment';
import { StatusBubble } from 'components';

export const COLUMN_DEFS = [
  { header: 'Task ID', field: '_id' },
  { header: 'Name', field: 'name' },
  { header: 'Description', field: 'description' },
  { header: 'Due Date', valueGetter: ({ dueDate }) => dueDate && moment(dueDate).format('MM/DD/YYYY') },
  {
    header: 'Completed',
    field: 'isCompleted',
    CustomCell: ({ data }) => <StatusBubble value={data.isCompleted ? 'active' : 'inactive'} />,
  },
];
