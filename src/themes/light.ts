import { Colors, Theme, TextStyles } from '../core/theme'
import { CommonSizes, CommonTextStyles } from './common'

const LightColors: Colors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#6d3df4',
  background: {
    primary: '#ffffff',
    secondary: '#f0f0f0',
  },
  text: {
    primary: '#000000',
    secondary: '#8d8d8d',
    placeholder: '#8d8d8d',
    unselected: '#8d8d8d',
  },
}

const LightTextStyles: TextStyles = {
  ...CommonTextStyles,
  default: {
    ...CommonTextStyles.default,
    color: LightColors.text.primary,
  },
}

const LightTheme: Theme = {
  sizes: CommonSizes,
  colors: LightColors,
  textStyles: LightTextStyles,
}

export default LightTheme
