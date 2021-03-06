import { range } from 'lodash'
import React, { memo, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { useTheme } from '../core/theme'

export interface ActivityIndicatorProps {
  size?: number
  count?: number
  color?: string
}

const calcOutputRange = (count: number) => {
  return (index: number) => Math.max(1.0 - index * (1 / (count - 1)), 0)
}

const Indicator = memo<{
  progress: Animated.Value
  index: number
  size: number
  count: number
  color: string
}>(({ progress, index, size, count, color }) => {
  const angle = (index * 360) / count

  const inputRange = range(0, count + 1).map(i => i / count)
  const outputRange = range(0, count).map(calcOutputRange(count))

  for (let j = 0; j < index; j++) {
    outputRange.unshift(outputRange.pop()!)
  }

  outputRange.unshift(...outputRange.slice(-1))

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'flex-start',
          alignItems: 'center',
        },
        {
          transform: [
            {
              rotate: angle + 'deg',
            },
          ],
        },
      ]}
    >
      <Animated.View
        style={{
          width: size / 10,
          height: size / 4,
          borderRadius: size / 20,
          backgroundColor: color,
          opacity: progress.interpolate({ inputRange, outputRange }),
        }}
      />
    </View>
  )
})

const ActivityIndicatorComponent: React.FC<ActivityIndicatorProps> = ({
  size: customSize,
  count: customCount,
  color: customColor,
}) => {
  const theme = useTheme()
  const progress = useRef(new Animated.Value(0)).current

  const size = customSize ?? theme.componentTheme.activityIndicator.size
  const count = customCount ?? theme.componentTheme.activityIndicator.count
  const color = customColor ?? theme.componentTheme.activityIndicator.color

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        easing: Easing.linear,
        duration: 1000,
        isInteraction: false,
        useNativeDriver: true,
      }),
    )

    animation.start()

    return () => animation.stop()
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
      {range(0, count).map(index => (
        <Indicator
          key={index}
          progress={progress}
          index={index}
          size={size}
          count={count}
          color={color}
        />
      ))}
    </View>
  )
}

export const ActivityIndicator = memo(ActivityIndicatorComponent)
