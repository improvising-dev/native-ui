import color from 'color'
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

  const resolvedBackgroundColor = backgroundColor ?? theme.colors.primary
  const activeBackgroundColor = color(resolvedBackgroundColor).isDark()
    ? color(resolvedBackgroundColor).lighten(0.07).string()
    : color(resolvedBackgroundColor).darken(0.07).string()

  const resolvedTextColor =
    textColor ??
    (color(resolvedBackgroundColor).isDark()
      ? theme.colors.white
      : theme.colors.black)

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
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [resolvedBackgroundColor, activeBackgroundColor],
        }),
        borderRadius: theme.sizes.borderRadius,
        padding: theme.sizes.spacing,
        opacity: disabled ? 0.7 : 1.0,
        ...style,
      }}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color: resolvedTextColor,
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
