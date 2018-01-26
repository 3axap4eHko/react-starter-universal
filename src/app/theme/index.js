import primaryColors from './colors/teal';
import accentColors from './colors/deepOrange';
import textColors from './colors/grey';
import backgroundColors from './colors/grey';

import errorColors from './colors/red';
import warningColors from './colors/orange';
import successColors from './colors/blue';

import shadows from './shadows';

const palette = {
  primary: primaryColors[400],
  accent: accentColors['A400'],
  text: textColors[50],
  background: backgroundColors[800],
  error: errorColors[400],
  warning: warningColors[400],
  success: successColors[400],
  disable: textColors[600],
};

export default {
  palette,
  shadows,
};