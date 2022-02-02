import { cloneDeep, merge } from 'lodash';
import { DefaultTheme } from './common';
const BackgroundColor = {
    primary: '#151515',
    secondary: '#000000',
    fill: '#252525',
    modalBarrier: 'rgba(0, 0, 0, .8)',
};
const TextColor = {
    primary: '#ffffff',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#5d5d5d',
    destructive: '#fe3f43',
    destructiveSecondary: '#fe3f4390',
    placeholder: '#5d5d5d',
};
export const DarkTheme = merge(cloneDeep(DefaultTheme), {
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
});
