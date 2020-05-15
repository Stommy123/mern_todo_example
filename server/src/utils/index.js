export const isUndefined = item => item === undefined;

export const isNull = item => item === null;

export const isNil = item => isUndefined(item) || isNull(item);

export const isArray = item => Object.prototype.toString.call(item) === '[object Array]';

export const isObject = item => !!(typeof item === 'object' && !isArray(item) && item);

export const isEmpty = item => {
  if (item && item.hasOwnProperty('length')) return !item.length;
  if (isObject(item)) return !Object.keys(item).length;
};

export const cloneDeep = item => JSON.parse(JSON.stringify(item));

export const nullifyEmptyValues = obj =>
  Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (!isEmpty(value) || !isNil(value)) acc[key] = value;

    return acc;
  }, {});

export const parseStringifiedJSON = (item, defaultValue) => {
  try {
    return JSON.parse(item);
  } catch {
    return isUndefined(defaultValue) ? item : defaultValue;
  }
};

export const noop = _ => ({});

export const wrappedErrorMessage = (message, err) => ({ error: { message, ...(err && { err: err.toString() }) } });

export const regexString = (str = '') => new RegExp(str.trim(), 'i');
