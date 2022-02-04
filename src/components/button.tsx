import React from 'react'
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { HapticFeedback } from '../actions/haptic-feedback'
import { useTheme } from '../core/theme'

export interface ButtonProps {
  children?: string | React.ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: TextStyle
  haptic?: boolean
  disabled?: boolean
  onPressed?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  textStyle,
  haptic = false,
  disabled = false,
  onPressed,
}) => {
  const theme = useTheme()
  const touchableProgress = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        interpolateColor(
          touchableProgress.value,
          [0, 1],
          theme.brightness === 'light'
            ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .05)']
            : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .05)'],
        ),
        { duration: 100 },
      ),
    }
  })

  const handlePress = () => {
    if (haptic) {
      HapticFeedback.lightImpact()
    }

    onPressed?.()
  }

  const handlePressIn = () => {
    touchableProgress.value = 1
  }

  const handlePressOut = () => {
    setTimeout(() => {
      touchableProgress.value = 0
    })
  }

  const handleTouchCancel = () => {
    touchableProgress.value = 0
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onTouchCancel={handleTouchCancel}
      disabled={disabled}
      style={[
        {
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.borderRadius,
          padding: theme.spacing,
          backgroundColor: theme.primaryColor,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
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
        style={[
          {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          },
          animatedStyles,
        ]}
      />
    </Pressable>
  )
}
