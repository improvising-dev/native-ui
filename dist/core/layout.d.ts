export declare class TextPadding {
    top: number;
    bottom: number;
    left: number;
    right: number;
    constructor({ top, bottom, left, right, }: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    });
    static get zero(): TextPadding;
    static all(value: number): TextPadding;
    static symmetric({ horizontal, vertical, }: {
        horizontal?: number;
        vertical?: number;
    }): TextPadding;
    build(): {
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;
    };
    get vertical(): number;
    get horizontal(): number;
}
