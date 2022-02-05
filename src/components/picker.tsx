import React, { useMemo, useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  ViewProps,
} from 'react-native'
import { HapticFeedback } from '../actions/haptic-feedback'
import { useTheme } from '../core/theme'

export interface PickerItem {
  title: string
  subtitle?: string
  value: string
}

export interface PickerProps extends ViewProps {
  items?: PickerItem[]
  defaultValue?: string
  onValueChange?: (value: string) => void
  height?: number
  itemHeight?: number
}

export const Picker: React.FC<PickerProps> = ({
  style,
  items = [],
  defaultValue,
  onValueChange,
  height,
  itemHeight: customItemHeight,
  ...props
}) => {
  const theme = useTheme()
  const lastHapticFeedbackIndex = useRef<number>()

  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const itemHeight = customItemHeight ?? theme.componentTheme.picker.itemHeight
  const containerHeight = height ?? itemHeight * 5

  const initialIndex = items.findIndex(item => item.value === selectedValue)

  const _renderItem = (item: PickerItem) => {
    const isSelected = item.value === selectedValue

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
          style={[
            theme.componentTheme.picker.titleTextStyle,
            {
              color: isSelected
                ? theme.textColor.primary
                : theme.textColor.primaryUnselected,
            },
          ]}
        >
          {item.title}
        </Text>
        {item.subtitle && (
          <Text
            style={[
              theme.componentTheme.picker.subtitleTextStyle,
              {
                marginTop: 2,
                color: isSelected
                  ? theme.textColor.secondary
                  : theme.textColor.secondaryUnselected,
              },
            ]}
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

    if (item && item.value !== selectedValue) {
      if (index !== lastHapticFeedbackIndex.current) {
        HapticFeedback.selectionClick()

        lastHapticFeedbackIndex.current = index
      }

      setSelectedValue(item.value)
      onValueChange?.(item.value)
    }
  }

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const y = event.nativeEvent.contentOffset.y
    const index = Math.round(y / itemHeight)
    const item = items[index]

    if (item && item.value !== selectedValue) {
      setSelectedValue(item.value)
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
    const height = (containerHeight - itemHeight) / 2

    return <View style={{ height, flex: 1 }} />
  }, [containerHeight, itemHeight])

  return (
    <View
      style={[
        {
          height: containerHeight,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      <View
        style={{
          position: 'absolute',
          top: (containerHeight - itemHeight) / 2,
          left: theme.spacing / 2,
          right: theme.spacing / 2,
          borderRadius: theme.borderRadius,
          height: itemHeight,
          backgroundColor: theme.backgroundColor.fill,
        }}
      />
      <FlatList
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => {
          return {
            length: itemHeight,
            offset: itemHeight * index,
            index,
          }
        }}
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
