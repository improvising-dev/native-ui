import RNHapticFeedback from 'react-native-haptic-feedback'

export class HapticFeedback {
  static lightImpact() {
    RNHapticFeedback.trigger('impactLight')
  }

  static mediumImpact() {
    RNHapticFeedback.trigger('impactMedium')
  }

  static heavyImpact() {
    RNHapticFeedback.trigger('impactHeavy')
  }

  static selectionClick() {
    RNHapticFeedback.trigger('selection')
  }
}
