/**
 * @providesModule PlatformWrapper
 * @flow
 */

import {
  Platform,
  Dimensions
} from 'react-native';
import { RNDeviceConstants } from 'NativeModules';

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isLandscape(screenWidth, screenHeight) {
  return (screenWidth > screenHeight);
}

export function isTablet() {
  return RNDeviceConstants.isTablet;
}

export function getScreenWidth() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return width > height ? height : width;
}
