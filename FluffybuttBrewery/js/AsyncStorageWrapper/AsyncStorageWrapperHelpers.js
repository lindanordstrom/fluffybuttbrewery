/**
 * @providesModule AsyncStorageWrapperHelpers
 */

import _ from 'underscore';

export function isValidKey(key) {
  return !_.isUndefined(key) && _.isString(key) && !_.isEmpty(key);
}

export function stringifyValue(value) {
  return JSON.stringify(value);
}

export function stringifyValues(keyValuePairs) {
  return keyValuePairs.filter(data => {
    if (_.isArray(data)) {
      const key = data[0];
      const value = data[1];
      return isValidKey(key) && !_.isUndefined(value);
    } else {
      return false;
    }
  })
  .map(([key, value]) => [key, stringifyValue(value)]);
}

export function parseValues(keyValuePairs) {
  return _.object(keyValuePairs.map(data => { // data -> ['key', 'value'] where value is stringified
    try {
      data[1] = JSON.parse(data[1]); // parse stringified value
      return data;
    } catch (error) {
      data[1] = null;
      return data;
    }
  }));
}
