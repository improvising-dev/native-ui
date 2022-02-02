import { cloneDeep, merge } from 'lodash'
import { Theme } from '../core/theme'
import { DefaultTheme } from './common'

const BackgroundColor: Theme['backgroundColor'] = {
  primary: '#151515',
  secondary: '#000000',
  fill: '#252525',
  modalBarrier: 'rgba(0, 0, 0, .8)',
} as const

const TextColor: Theme['textColor'] = {
  primary: '#ffffff',
  primaryUnselected: '#8d8d8d',
  secondary: '#8d8d8d',
  secondaryUnselected: '#5d5d5d',
  destructive: '#fe3f43',
  destructiveSecondary: '#fe3f4390',
  placeholder: '#5d5d5d',
} as const

export const DarkTheme: Theme = merge(cloneDeep(DefaultTheme), {
  brightness: 'dark',

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

  componentTheme: {
    dialog: {
      messageTextStyle: {
        color: TextColor.secondary,
      },
    },
  },
} as const)
