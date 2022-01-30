"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTheme = exports.DefaultTextTheme = exports.DefaultComponentTheme = void 0;
exports.DefaultComponentTheme = {
    actionSheet: {
        zIndex: 500,
        itemHeight: 60,
    },
    checkbox: {
        size: 18,
    },
    dialog: {
        zIndex: 1000,
    },
    fullscreenLoading: {
        zIndex: 5000,
    },
    picker: {
        itemHeight: 50,
        titleTextStyle: { fontSize: 17 },
        subtitleTextStyle: { fontSize: 12 },
    },
};
exports.DefaultTextTheme = {
    default: {
        fontSize: 17,
        letterSpacing: -0.41,
    },
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
exports.DefaultTheme = {
    spacing: 15,
    borderRadius: 15,
    textTheme: exports.DefaultTextTheme,
    componentTheme: exports.DefaultComponentTheme,
};
//# sourceMappingURL=common.js.map