import { Pressable, ViewStyle } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { useTheme } from '../core/theme'

export interface CheckBoxProps {
  value: boolean
  onValueChange?: (value: boolean) => void
  style?: ViewStyle
  checkedColor?: string
  uncheckedColor?: string
  iconColor?: string
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  onValueChange,
  style,
  checkedColor,
  uncheckedColor,
  iconColor,
}) => {
  const theme = useTheme()
  const size = theme.sizes.checkBoxSize
  const iconSize = Math.floor(theme.sizes.checkBoxSize * 0.8)

  checkedColor ??= theme.colors.primary
  uncheckedColor ??= theme.colors.background.primary
  iconColor ??= theme.colors.white

  return (
    <Pressable
      onPress={() => onValueChange?.(!value)}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: value ? checkedColor : uncheckedColor,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {value && (
        <Icon
          name="checkmark"
          fill={iconColor}
          width={iconSize}
          height={iconSize}
        />
      )}
    </Pressable>
  )
}
