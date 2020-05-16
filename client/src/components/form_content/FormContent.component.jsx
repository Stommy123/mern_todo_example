import React from 'react';
import dayjs from 'dayjs';

// really wanted to convert this to a json schema form that maps over an array of field objects, but figured that might be too advance
const today = dayjs().format('YYYY-MM-DD');

const SignUpFormContent = ({ email, password, firstName, lastName, dob, onChange }) => (
  <>
    <input type='text' required placeholder='First Name' value={firstName} onChange={onChange('firstName')} />
    <input type='text' required placeholder='Last Name' value={lastName} onChange={onChange('lastName')} />
    <input type='date' max={today} required placeholder='Date of Birth' value={dob} onChange={onChange('dob')} />
    <input type='text' required placeholder='email' value={email} onChange={onChange('email')} />
    <input type='text' required placeholder='password' value={password} onChange={onChange('password')} />
  </>
);

const LoginFormContent = ({ email, password, onChange }) => (
  <>
    <input type='text' required placeholder='email' value={email} onChange={onChange('email')} />
    <input type='password' required placeholder='password' value={password} onChange={onChange('password')} />
  </>
);

const TaskFormContent = ({ name, description, dueDate, onChange }) => (
  <>
    <input type='text' required placeholder='Task name' value={name} onChange={onChange('name')} />
    <input type='text' required placeholder='Task description' value={description} onChange={onChange('description')} />
    <input type='date' min={today} placeholder='Due Date' value={dueDate} onChange={onChange('dueDate')} />
  </>
);

export default { SignUpFormContent, LoginFormContent, TaskFormContent };
