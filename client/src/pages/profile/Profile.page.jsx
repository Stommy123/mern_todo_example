import React, { useContext } from 'react';
import { AppContext } from 'context';
import dayjs from 'dayjs';
import { SectionWrapper } from 'components';
import classes from './Profile.module.scss';

const Profile = _ => {
  const { currentUser } = useContext(AppContext);
  const { email, firstName, lastName, dob } = currentUser;

  return (
    <SectionWrapper>
      <div className={classes.profileWrapper}>
        <h1>Account Information</h1>
        <h3>Email: {email}</h3>
        <h3>First Name: {firstName}</h3>
        <h3>Last Name: {lastName}</h3>
        {dob && <h3>Date of Birth: {dayjs(dob).format('MM/DD/YYYY')}</h3>}
      </div>
    </SectionWrapper>
  );
};

export default Profile;
