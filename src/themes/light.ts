import { cloneDeep, merge } from 'lodash'
import { Theme } from '../core/theme'
import { DefaultTheme } from './common'

const BackgroundColor: Theme['backgroundColor'] = {
  primary: '#ffffff',
  secondary: '#f0f0f0',
  fill: '#f0f0f0',
  modalBarrier: 'rgba(0, 0, 0, .6)',
} as const

const TextColor: Theme['textColor'] = {
  primary: '#000000',
  primaryUnselected: '#8d8d8d',
  secondary: '#8d8d8d',
  secondaryUnselected: '#adadad',
  placeholder: '#adadad',
} as const

export const LightTheme: Theme = merge(cloneDeep(DefaultTheme), {
  brightness: 'light',

  white: '#ffffff',
  black: '#000000',

  primaryColor: '#6d3df4',
  primaryContrastingColor: '#ffffff',

  backgroundColor: BackgroundColor,
  textColor: TextColor,

  textTheme: {
    default: {
      color: TextColor.primary,
    },
  },
} as const)
