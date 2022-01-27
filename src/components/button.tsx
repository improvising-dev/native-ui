import tinycolor from '@ctrl/tinycolor'
import { Animated, Pressable, Text, TextStyle, ViewStyle } from 'react-native'
import { HapticFeedback } from '../actions/haptics'
import { useAnimatedValue } from '../core/animation'
import { useTheme } from '../core/theme'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonProps {
  children?: string | React.ReactNode
  backgroundColor?: string
  textColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  haptic?: boolean
  onPressed?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor,
  textColor,
  style,
  textStyle,
  haptic = false,
  onPressed,
}) => {
  const animatedValue = useAnimatedValue(0)
  const theme = useTheme()

  const disabled = !onPressed

  backgroundColor ??= theme.colors.primary

  const colorOps = tinycolor(backgroundColor)
  const activeBackgroundColor = colorOps.isDark()
    ? colorOps.tint(5).toHexString()
    : colorOps.shade(5).toHexString()

  textColor ??= colorOps.isDark() ? theme.colors.white : theme.colors.black

  const handlePress = () => {
    if (haptic) {
      HapticFeedback.lightImpact()
    }

    onPressed?.()
  }

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={() => {
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start()
      }}
      onPressOut={() => {
        setTimeout(() => {
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }).start()
        }, 200)
      }}
      onTouchCancel={() => {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start()
      }}
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [backgroundColor, activeBackgroundColor],
        }),
        borderRadius: theme.sizes.borderRadius,
        padding: theme.sizes.spacing,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color: textColor,
            ...theme.textStyles.button,
            ...textStyle,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </AnimatedPressable>
  )
}
