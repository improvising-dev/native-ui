import { Animated, Pressable, Text, TextStyle, ViewStyle } from 'react-native'
import { HapticFeedback } from '../actions/haptics'
import { useAnimatedValue } from '../core/animation'
import { useTheme } from '../core/theme'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export interface ButtonProps {
  children?: string | React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  haptic?: boolean
  onPressed?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  textStyle,
  haptic = false,
  onPressed,
}) => {
  const animatedValue = useAnimatedValue(0)
  const theme = useTheme()

  const disabled = !onPressed

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
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius,
        padding: theme.spacing,
        backgroundColor: theme.primaryColor,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
    >
      {typeof children === 'string' ? (
        <Text
          style={{
            color: theme.primaryContrastingColor,
            ...theme.textTheme.button,
            ...textStyle,
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange:
              theme.brightness === 'light'
                ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .05)']
                : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .05)'],
          }),
        }}
      />
    </AnimatedPressable>
  )
}
