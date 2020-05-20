export const StorageKey = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  CURRENT_USER: 'CURRENT_USER',
};

export const ErrorMap = {
  INVALID_ID: 'Could not locate resource with this ID. Please try again with a valid ID',
  EMAIL_AND_PASSWORD_REQUIRED: 'Both email and password are required to log in',
  INCORRECT_EMAIL_OR_PASSWORD: 'A user could not be located with this email and password',
  SIGN_IN_FAILED: 'Failed to sign in. Please try again',
  LIST_USERS_FAILED: 'Failed to retrieve the list of users. Please try again later',
  FIND_USER_FAILED: 'Failed to retrieve this user. Please try again later',
  UNAUTHENTICATED: 'Please login to continue',
  INSUFFICIENT_PERMISSION: 'You do not have permission to perform this operation',
  CREATE_USER_FAILED: 'Failed to create the user. Please try again',
  UPDATE_USER_FAILED: 'Failed to update the user. Please try again',
  DELETE_USER_FAILED: 'Failed to delete the user. Please try again',
  LIST_TASKS_FAILED: 'Failed to retrieve the list of tasks. Please try again later',
  FIND_TASK_FAILED: 'Failed to retrieve this task. Please try again later',
  CREATE_TASK_FAILED: 'Failed to create the task. Please try again',
  UPDATE_TASK_FAILED: 'Failed to update the task. Please try again',
  DELETE_TASK_FAILED: 'Failed to delete the task. Please try again',
};

export const ApiRoutes = {
  signIn: '/sign-in',
  signOut: '/sign-out',
  myTasks: '/tasks/mine',
  tasks: '/tasks',
  users: '/users',
};
