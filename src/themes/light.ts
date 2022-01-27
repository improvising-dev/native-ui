import { Colors, Theme, TextStyles } from '../core/theme'
import { CommonSizes, CommonTextStyles } from './common'

const LightColors: Colors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#6d3df4',
  background: {
    primary: '#ffffff',
    secondary: '#f0f0f0',
    fill: '#f5f5f5',
    modalBarrier: 'rgba(0, 0, 0, .7)',
  },
  text: {
    primary: '#000000',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#adadad',
    placeholder: '#8d8d8d',
  },
}

const LightTextStyles: TextStyles = {
  ...CommonTextStyles,
  default: {
    ...CommonTextStyles.default,
    color: LightColors.text.primary,
  },
}

export const LightTheme: Theme = {
  brightness: 'light',
  sizes: CommonSizes,
  colors: LightColors,
  textStyles: LightTextStyles,
}
