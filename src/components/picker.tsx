import React, { useMemo, useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { HapticFeedback } from '../actions/haptics'
import { useTheme } from '../core/theme'

export interface PickerItem {
  title: string
  subtitle?: string
  value: string
}

export interface PickerProps extends ViewProps {
  style?: ViewStyle
  items?: PickerItem[]
  selectedValue?: string
  onValueChange?: (value: string) => void
  height?: number
  itemHeight?: number
}

export const Picker: React.FC<PickerProps> = ({
  style,
  items = [],
  selectedValue,
  onValueChange,
  height,
  itemHeight = 50,
  ...props
}) => {
  const theme = useTheme()
  const wrapperHeight = height ?? itemHeight * 5

  const [value, setValue] = useState(selectedValue)
  const lastHapticFeedbackIndex = useRef<number>()

  const _renderItem = (item: PickerItem) => {
    const isSelected = item.value === value

    return (
      <View
        key={item.value}
        style={{
          height: itemHeight,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            ...theme.textStyles.picker.title,
            color: isSelected
              ? theme.colors.text.primary
              : theme.colors.text.primaryUnselected,
          }}
        >
          {item.title}
        </Text>
        {item.subtitle && (
          <Text
            style={{
              ...theme.textStyles.picker.subtitle,
              marginTop: 2,
              color: isSelected
                ? theme.colors.text.secondary
                : theme.colors.text.secondaryUnselected,
            }}
          >
            {item.subtitle}
          </Text>
        )}
      </View>
    )
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / itemHeight)
    const item = items[index]

    if (item && item.value !== value) {
      if (index !== lastHapticFeedbackIndex.current) {
        HapticFeedback.selectionClick()

        lastHapticFeedbackIndex.current = index
      }

      setValue(item.value)
      onValueChange?.(item.value)
    }
  }

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / itemHeight)
    const item = items[index]

    if (item && item.value !== value) {
      setValue(item.value)
      onValueChange?.(item.value)
    }
  }

  const snapToOffsets = useMemo(() => {
    const offsets: number[] = []

    for (let i = 0; i < items.length; i++) {
      offsets.push(i * itemHeight)
    }

    return offsets
  }, [items, itemHeight])

  const placeholder = useMemo(() => {
    const height = (wrapperHeight - itemHeight) / 2

    return <View style={{ height, flex: 1 }} />
  }, [wrapperHeight, itemHeight])

  return (
    <View style={{ overflow: 'hidden', ...style }} {...props}>
      <View
        style={{
          position: 'absolute',
          top: (wrapperHeight - itemHeight) / 2,
          left: theme.sizes.spacing / 2,
          right: theme.sizes.spacing / 2,
          borderRadius: theme.sizes.borderRadius,
          height: itemHeight,
          backgroundColor: theme.colors.background.fill,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={snapToOffsets}
        ListHeaderComponent={placeholder}
        ListFooterComponent={placeholder}
        data={items}
        renderItem={({ item }) => _renderItem(item)}
        keyExtractor={item => item.value}
      />
    </View>
  )
}
