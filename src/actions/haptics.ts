import Haptics from 'expo-haptics'

export class HapticFeedback {
  static async lightImpact() {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  static async mediumImpact() {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  static async heavyImpact() {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  static async selectionClick() {
    return Haptics.selectionAsync()
  }
}
