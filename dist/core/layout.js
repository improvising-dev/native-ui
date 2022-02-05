export class TextPadding {
    constructor({ top = 0, bottom = 0, left = 0, right = 0, }) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    static get zero() {
        return new TextPadding({
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
    }
    static all(value) {
        return new TextPadding({
            top: value,
            bottom: value,
            left: value,
            right: value,
        });
    }
    static symmetric({ horizontal = 0, vertical = 0, }) {
        return new TextPadding({
            top: vertical,
            bottom: vertical,
            left: horizontal,
            right: horizontal,
        });
    }
    build() {
        return {
            paddingTop: this.top,
            paddingBottom: this.bottom,
            paddingLeft: this.left,
            paddingRight: this.right,
        };
    }
    get vertical() {
        return this.top + this.bottom;
    }
    get horizontal() {
        return this.left + this.right;
    }
}
