import { cloneDeep, merge } from 'lodash';
import { DefaultTheme } from './common';
const BackgroundColor = {
    primary: '#ffffff',
    secondary: '#f0f0f0',
    fill: '#f0f0f0',
    modalBarrier: 'rgba(0, 0, 0, .6)',
};
const TextColor = {
    primary: '#000000',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#adadad',
    placeholder: '#adadad',
};
export const LightTheme = merge(cloneDeep(DefaultTheme), {
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
    componentTheme: {
        dialog: {
            messageTextStyle: {
                color: TextColor.secondary,
            },
        },
    },
});
