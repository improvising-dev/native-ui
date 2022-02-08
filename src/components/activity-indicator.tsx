import { range } from 'lodash'
import React, { memo, useEffect } from 'react'
import { Easing, StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'

export interface ActivityIndicatorProps {
  size?: number
  count?: number
  color?: string
}

const calcOutputRange = (count: number) => {
  return (index: number) => Math.max(1.0 - index * (1 / (count - 1)), 0)
}

const ActivityIndicatorComponent: React.FC<ActivityIndicatorProps> = ({
  size: customSize,
  count: customCount,
  color,
}) => {
  const theme = useTheme()
  const progress = useSharedValue(0)

  const size = customSize ?? theme.componentTheme.activityIndicator.size
  const count = customCount ?? theme.componentTheme.activityIndicator.count
  const backgroundColor = color ?? theme.componentTheme.activityIndicator.color

  const initialInputRange = range(0, count + 1).map(i => i / count)
  const initialOutputRange = range(0, count).map(calcOutputRange(count))

  const animatedStyles = range(0, count).map(index => {
    const inputRange = [...initialInputRange]
    const outputRange = [...initialOutputRange]

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop()!)
    }

    outputRange.unshift(...outputRange.slice(-1))

    return useAnimatedStyle(() => {
      return {
        opacity: interpolate(progress.value, inputRange, outputRange),
      }
    })
  })

  const renderComponent = (index: number) => {
    const angle = (index * 360) / count

    return (
      <View
        key={index}
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'flex-start',
            alignItems: 'center',
            transform: [
              {
                rotate: angle + 'deg',
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: size / 10,
              height: size / 4,
              borderRadius: size / 20,
              backgroundColor,
            },
            animatedStyles[index],
          ]}
        />
      </View>
    )
  }

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { easing: Easing.linear }), -1)
  }, [])

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {range(0, count).map(renderComponent)}
    </View>
  )
}

export const ActivityIndicator = memo(ActivityIndicatorComponent)
