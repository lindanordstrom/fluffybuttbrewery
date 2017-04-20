/**
 * @providesModule Colors
 */
const ColorValues = {
  BACKGROUND: '#919db5',
  BACKGROUND_LIGHT: '#F2F5FF',
  MAIN: '#223a6a',
  SECOND: '#3860B0',
  THIRD: '#9f7990',
  DEFAULT: '#000000'
};

export const ColorKeys = {
  BACKGROUND: 'BACKGROUND',
  BACKGROUND_LIGHT: 'BACKGROUND_LIGHT',
  MAIN: 'MAIN',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  DEFAULT: 'DEFAULT'
};

export function getColor(key) {
  return ColorValues[key] || ColorValues[ColorKeys.DEFAULT];
}

// import { getColor, ColorKeys } from 'Colors';
