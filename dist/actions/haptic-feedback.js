import RNHapticFeedback from 'react-native-haptic-feedback';
const HAPTIC_OPTIONS = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};
export class HapticFeedback {
    static lightImpact() {
        RNHapticFeedback.trigger('impactLight', HAPTIC_OPTIONS);
    }
    static mediumImpact() {
        RNHapticFeedback.trigger('impactMedium', HAPTIC_OPTIONS);
    }
    static heavyImpact() {
        RNHapticFeedback.trigger('impactHeavy', HAPTIC_OPTIONS);
    }
    static selectionClick() {
        RNHapticFeedback.trigger('selection', HAPTIC_OPTIONS);
    }
}
