import React from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'
import { Icon } from './icon'

export interface CheckBoxProps {
  value: boolean
  onValueChange?: (value: boolean) => void
  size?: number
  style?: StyleProp<ViewStyle>
  checkedColor?: string
  uncheckedColor?: string
  iconColor?: string
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  onValueChange,
  size: customSize,
  style,
  checkedColor: customCheckedColor,
  uncheckedColor: customUncheckedColor,
  iconColor: customIconColor,
}) => {
  const theme = useTheme()
  const size = customSize ?? theme.componentTheme.checkbox.size
  const iconSize = Math.floor(size * 0.8)

  const checkedColor = customCheckedColor ?? theme.primaryColor
  const uncheckedColor = customUncheckedColor ?? theme.backgroundColor.primary
  const iconColor = customIconColor ?? theme.primaryContrastingColor

  return (
    <Pressable
      onPress={() => onValueChange?.(!value)}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: value ? checkedColor : uncheckedColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {value && (
        <Icon.Checkmark fill={iconColor} width={iconSize} height={iconSize} />
      )}
    </Pressable>
  )
}
