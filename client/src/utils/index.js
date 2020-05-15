export const isUndefined = item => item === undefined;

export const isNull = item => item === null;

export const isNil = item => isUndefined(item) || isNil(item);

export const isArray = item => Object.prototype.toString.call(item) === '[object Array]';

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
