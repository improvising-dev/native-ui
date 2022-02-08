export declare const DefaultComponentTheme: {
    readonly actionSheet: {
        readonly zIndex: 500;
        readonly itemHeight: 60;
        readonly titleTextStyle: {
            readonly fontSize: 17;
            readonly fontWeight: "500";
        };
        readonly subtitleTextStyle: {
            readonly fontSize: 12;
        };
    };
    readonly activityIndicator: {
        readonly size: 30;
        readonly count: 12;
    };
    readonly checkbox: {
        readonly size: 18;
    };
    readonly dialog: {
        readonly zIndex: 1000;
        readonly titleTextStyle: {
            readonly fontSize: 19;
            readonly fontWeight: "500";
        };
        readonly messageTextStyle: {
            readonly fontSize: 17;
        };
    };
    readonly fullscreenLoading: {
        readonly zIndex: 5000;
    };
    readonly picker: {
        readonly itemHeight: 50;
        readonly titleTextStyle: {
            readonly fontSize: 17;
        };
        readonly subtitleTextStyle: {
            readonly fontSize: 12;
        };
    };
};
export declare const DefaultTextTheme: {
    readonly default: {
        fontSize: number;
        letterSpacing: number;
        fontFamily?: undefined;
        includeFontPadding?: undefined;
    } | {
        fontFamily: string;
        includeFontPadding: boolean;
        fontSize?: undefined;
        letterSpacing?: undefined;
    };
    readonly body: {
        readonly fontSize: 17;
        readonly lineHeight: 23;
    };
    readonly button: {
        readonly fontSize: 17;
        readonly fontWeight: "500";
    };
    readonly small: {
        readonly fontSize: 15;
    };
};
export declare const DefaultTheme: {
    readonly spacing: 15;
    readonly borderRadius: 15;
    readonly textTheme: {
        readonly default: {
            fontSize: number;
            letterSpacing: number;
            fontFamily?: undefined;
            includeFontPadding?: undefined;
        } | {
            fontFamily: string;
            includeFontPadding: boolean;
            fontSize?: undefined;
            letterSpacing?: undefined;
        };
        readonly body: {
            readonly fontSize: 17;
            readonly lineHeight: 23;
        };
        readonly button: {
            readonly fontSize: 17;
            readonly fontWeight: "500";
        };
        readonly small: {
            readonly fontSize: 15;
        };
    };
    readonly componentTheme: {
        readonly actionSheet: {
            readonly zIndex: 500;
            readonly itemHeight: 60;
            readonly titleTextStyle: {
                readonly fontSize: 17;
                readonly fontWeight: "500";
            };
            readonly subtitleTextStyle: {
                readonly fontSize: 12;
            };
        };
        readonly activityIndicator: {
            readonly size: 30;
            readonly count: 12;
        };
        readonly checkbox: {
            readonly size: 18;
        };
        readonly dialog: {
            readonly zIndex: 1000;
            readonly titleTextStyle: {
                readonly fontSize: 19;
                readonly fontWeight: "500";
            };
            readonly messageTextStyle: {
                readonly fontSize: 17;
            };
        };
        readonly fullscreenLoading: {
            readonly zIndex: 5000;
        };
        readonly picker: {
            readonly itemHeight: 50;
            readonly titleTextStyle: {
                readonly fontSize: 17;
            };
            readonly subtitleTextStyle: {
                readonly fontSize: 12;
            };
        };
    };
};
