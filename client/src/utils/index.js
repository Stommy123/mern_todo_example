import { ErrorMap } from 'global_constants';

export const isUndefined = item => item === undefined;

export const isNull = item => item === null;

export const isNil = item => isUndefined(item) || isNil(item);

export const isArray = item => Array.isArray(item);

export const isObject = item => !!(typeof item === 'object' && !isArray(item) && item);

export const isEmpty = item => {
  if (item && item.hasOwnProperty('length')) return !item.length;
  if (isObject(item)) return !Object.keys(item).length;
  return isNil(item);
};

export const parseStringifiedJSON = (item, defaultValue) => {
  try {
    return JSON.parse(item);
  } catch {
    return isUndefined(defaultValue) ? item : defaultValue;
  }
};

export const noop = _ => ({});

export const mapErrorCodeToMessage = err => {
  return ErrorMap[err.code] || ErrorMap[err.reason];
};
