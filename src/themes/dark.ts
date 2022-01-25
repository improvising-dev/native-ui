import { Colors, Theme, TextStyles } from '../core/theme'
import { CommonSizes, CommonTextStyles } from './common'

const DarkColors: Colors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#6d3df4',
  background: {
    primary: '#151515',
    secondary: '#000000',
  },
  text: {
    primary: '#ffffff',
    secondary: '#8d8d8d',
    placeholder: '#8d8d8d',
    unselected: '#8d8d8d',
  },
}

const DarkTextStyles: TextStyles = {
  ...CommonTextStyles,
  default: {
    ...CommonTextStyles.default,
    color: DarkColors.text.primary,
  },
}

const DarkTheme: Theme = {
  sizes: CommonSizes,
  colors: DarkColors,
  textStyles: DarkTextStyles,
}

export default DarkTheme
