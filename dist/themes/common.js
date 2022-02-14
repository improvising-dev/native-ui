import { Platform } from 'react-native';
export const DefaultComponentTheme = {
    actionSheet: {
        zIndex: 500,
        itemHeight: 60,
        titleTextStyle: {
            fontSize: 17,
            fontWeight: '500',
        },
        subtitleTextStyle: { fontSize: 12 },
    },
    activityIndicator: {
        size: 30,
        count: 12,
    },
    checkbox: {
        size: 18,
    },
    dialog: {
        zIndex: 1000,
        titleTextStyle: {
            fontSize: 19,
            fontWeight: '500',
        },
        messageTextStyle: { fontSize: 17 },
    },
    fullscreenLoading: {
        zIndex: 5000,
    },
    picker: {
        itemHeight: 50,
        titleTextStyle: { fontSize: 17 },
        subtitleTextStyle: { fontSize: 12 },
    },
    toast: {
        zIndex: 10000,
        variants: {
            info: {
                backgroundColor: '#303030',
                textColor: '#ffffff',
            },
            success: {
                backgroundColor: '#26ad8d',
                textColor: '#ffffff',
            },
            error: {
                backgroundColor: '#fe3f43',
                textColor: '#ffffff',
            },
        },
    },
};
export const DefaultTextTheme = {
    default: Platform.select({
        default: {
            fontSize: 17,
            letterSpacing: -0.41,
        },
        android: {
            fontFamily: 'Roboto',
            includeFontPadding: false,
        },
    }),
    body: {
        fontSize: 17,
        lineHeight: 23,
    },
    button: {
        fontSize: 17,
        fontWeight: '500',
    },
    small: {
        fontSize: 15,
    },
};
export const DefaultTheme = {
    spacing: 15,
    borderRadius: 15,
    textTheme: DefaultTextTheme,
    componentTheme: DefaultComponentTheme,
};
