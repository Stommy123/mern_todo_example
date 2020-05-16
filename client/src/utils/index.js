export const isUndefined = item => item === undefined;

export const isNull = item => item === null;

export const isNil = item => isUndefined(item) || isNil(item);

export const isArray = item => Array.isArray(item);

export const isObject = item => !!(typeof item === 'object' && !isArray(item) && item);

export const isEmpty = item => {
  if (item && item.hasOwnProperty('length')) return !item.length;
  if (isObject(item)) return !Object.keys(item).length;
  return true;
};

export const parseStringifiedJSON = (item, defaultValue) => {
  try {
    return JSON.parse(item);
  } catch {
    return isUndefined(defaultValue) ? item : defaultValue;
  }
};

export const noop = _ => ({});

export const ERROR_MAP = {
  INVALID_ID: 'Could not locate resource with this ID. Please try again with a valid ID',
  EMAIL_AND_PASSWORD_REQUIRED: 'Both email and password are required to log in',
  INCORRECT_EMAIL_OR_PASSWORD: 'A user could not be located with this email and password',
  SIGN_IN_FAILED: 'Failed to sign in. Please try again',
  LIST_USERS_FAILED: 'Failed to retrieve the list of users. Please try again later',
  FIND_USER_FAILED: 'Failed to retrieve this user. Please try again later',
  UNAUTHORIZED_USER: 'Please login to continue',
  NO_PERMISSION: 'You do not have permission to perform this operation',
  CREATE_USER_FAILED: 'Failed to create the user. Please try again',
  UPDATE_USER_FAILED: 'Failed to update the user. Please try again',
  DELETE_USER_FAILED: 'Failed to delete the user. Please try again',
  LIST_TASKS_FAILED: 'Failed to retrieve the list of tasks. Please try again later',
  FIND_TASK_FAILED: 'Failed to retrieve this task. Please try again later',
  CREATE_TASK_FAILED: 'Failed to create the task. Please try again',
  UPDATE_TASK_FAILED: 'Failed to update the task. Please try again',
  DELETE_TASK_FAILED: 'Failed to delete the task. Please try again',
};

export const mapErrorCodeToMessage = err => {
  console.log('what is the err', err);
  return ERROR_MAP[err.code] || ERROR_MAP[err.reason];
};
