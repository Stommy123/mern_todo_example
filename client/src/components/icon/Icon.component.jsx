import React from 'react';

const Icon = ({ onClick, icon }) => (
  <i onClick={_ => onClick?.()} className='icn-logo material-icons'>
    {icon}
  </i>
);

export default Icon;
