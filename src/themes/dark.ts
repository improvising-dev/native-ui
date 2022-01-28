import { Colors, Theme, TextStyles } from '../core/theme'
import { CommonSizes, CommonTextStyles } from './common'

const DarkColors: Colors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#6d3df4',
  primaryContrasting: '#ffffff',
  background: {
    primary: '#151515',
    secondary: '#000000',
    fill: '#252525',
    modalBarrier: 'rgba(0, 0, 0, .7)',
  },
  text: {
    primary: '#ffffff',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#5d5d5d',
    placeholder: '#8d8d8d',
  },
}

const DarkTextStyles: TextStyles = {
  ...CommonTextStyles,
  default: {
    ...CommonTextStyles.default,
    color: DarkColors.text.primary,
  },
}

export const DarkTheme: Theme = {
  brightness: 'dark',
  sizes: CommonSizes,
  colors: DarkColors,
  textStyles: DarkTextStyles,
}
