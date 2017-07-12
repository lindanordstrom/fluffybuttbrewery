/**
 * @providesModule AsyncStorageWrapper
 */

import { AsyncStorage } from 'react-native';
import _ from 'underscore';
import AsyncStorageWrapperConstants from 'AsyncStorageWrapperConstants';
import { isValidKey, stringifyValue, stringifyValues, parseValues } from 'AsyncStorageWrapperHelpers';

class AsyncStorageWrapper {
  /**
   * Perform AsyncStorage setItem.
   * Value to be stored is stringified before saving.
   * @param {key, value} param - key should be of type string, value can be anything
   * @returns {Promise<Success, Error>}
   */
  static setItem = (key, value) => {
    return new Promise((resolve, reject) => {
      if (!_.isUndefined(value)) {
        if (isValidKey(key)) {
          resolve(AsyncStorage.setItem(key, stringifyValue(value)));
        } else {
          reject(AsyncStorageWrapperConstants.ERROR.INVALID_KEY);
        }
      } else {
        reject(AsyncStorageWrapperConstants.ERROR.INVALID_KEY_VALUE);
      }
    });
  };

  /**
   * Perform AsyncStorage getItem.
   * @param {key} param - key should be of type string
   * @returns {Promise<number|string|null|object, Error>} success value is parsed
   */
  static getItem = (key) => {
    return new Promise((resolve, reject) => {
      if (isValidKey(key)) {
        AsyncStorage.getItem(key)
          .then(value => {
            try {
              resolve(JSON.parse(value));
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      } else {
        reject(AsyncStorageWrapperConstants.ERROR.INVALID_KEY);
      }
    });
  };

  /**
   * Perform AsyncStorage removeItem.
   * @param {string} param - key should be of type string
   * @returns {Promise<Success, Error>}
   */
  static removeItem = (key) => {
    return AsyncStorage.removeItem(key);
  };

  /**
   * Perform AsyncStorage clear.
   * Should perform AsyncStorage.clear()
   */
  static clear = () => {
    return AsyncStorage.clear();
  }
}

module.exports = AsyncStorageWrapper;
