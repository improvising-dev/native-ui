"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HapticFeedback = void 0;
var react_native_haptic_feedback_1 = __importDefault(require("react-native-haptic-feedback"));
var HAPTIC_OPTIONS = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
var HapticFeedback = /** @class */ (function () {
    function HapticFeedback() {
    }
    HapticFeedback.lightImpact = function () {
        react_native_haptic_feedback_1.default.trigger('impactLight', HAPTIC_OPTIONS);
    };
    HapticFeedback.mediumImpact = function () {
        react_native_haptic_feedback_1.default.trigger('impactMedium', HAPTIC_OPTIONS);
    };
    HapticFeedback.heavyImpact = function () {
        react_native_haptic_feedback_1.default.trigger('impactHeavy', HAPTIC_OPTIONS);
    };
    HapticFeedback.selectionClick = function () {
        react_native_haptic_feedback_1.default.trigger('selection', HAPTIC_OPTIONS);
    };
    return HapticFeedback;
}());
exports.HapticFeedback = HapticFeedback;
//# sourceMappingURL=haptic-feedback.js.map